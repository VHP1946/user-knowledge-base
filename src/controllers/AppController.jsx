import React, { Component } from 'react'

import '../components'

export class AppController extends Component {
	constructor(props) {
		super(props)

		this.state = {
			store: undefined,
			DropNoteProps: {
				showNote: false,
				text: 'Note?',
				level: 'orange',
				timeout: 0
			},
			loading: false,
			loadingMsg: "Loading",
			quotes: [],
			settings: {},
			filters: {
				estimator: "",
				date: "",
				amount: "",
				status: "",
				stage: "",
				bids: false
			},
			filterActive: false,
			statusDrops: [],
			userList: [],
			user: props.config.user,
			dev: props.dev || false  // create shortcut to "dev mode" boolean
		}

		this.state.user.userInfo = {     // temp until access is saved in admin
			id: "MURRY",
			apps: [
				"Estimator"
			],
			groups: [
				{
					group: "Replacement",
					categories: [
						{
							category: "Residential",
							products: [
								"boilers",
								"tradsplit",
								"mini"
							]
						}
					]
				}
			]
		}

		this.appinfo = props.appinfo;
		this.config = controllerconfig.local;  // this.state.dev ? controllerconfig.dev : controllerconfig.default;

		this.GetSettings = this.GetSettings.bind(this)
		this.GetTracks = this.GetTracks.bind(this)
		this.GetUserList = this.GetUserList.bind(this)
		this.UpdateTracker = this.UpdateTracker.bind(this)
		this.SetQuotes = this.SetQuotes.bind(this)
		this.RequestHelp = this.RequestHelp.bind(this)
		this.SetFilters = SetGlobalFilters.bind(this)
		this.ResetFilters = ResetGlobalFilters.bind(this)
		this.GetFilterCardData = this.GetFilterCardData.bind(this)

		//REACT
		this.GetApp = this.GetApp.bind(this)
		this.CloseNote = CloseNote.bind(this)
		this.SetDropNote = SetDropNote.bind(this)
		this.ToggleLoadingScreen = ToggleLoadingScreen.bind(this)
		this.ToggleBoolean = ToggleBoolean.bind(this)
	}

	componentDidMount() {
		this.setState({
			store: new Core(this.config.connect)
		}, async () => {
			await this.GetSettings();
			await this.GetTracks();
			if (this.state.user.name == 'RESMAN') {
				await this.GetUserList();
			}
		})
	}

	/**
	 * Retrieves settings from electron or the API
	 * @todo Add electron route for settings
	 */
	GetSettings() {
		return new Promise(async (resolve, reject) => {
			let resp = await this.state.store.SENDrequest({
				route: 'GETsettings',
				body: {
					data: {
						appinfo: this.appinfo,
						userinfo: this.state.user.userInfo
					}
				}
			});
			let statusDrops = [];

			if (resp.success) {
				statusDrops = GenerateDropDownList(this.CreateStatusDrop(resp.data.settings.workscheme));
			}

			this.setState({
				settings: resp.data.settings,
				statusDrops: statusDrops
			})

			return resolve(resp)
		})
	}

	GetTracks() {
		return new Promise(async (resolve, reject) => {
			this.SetDropNote({
				showNote: true,
				level: "blue",
				text: "Loading data",
				timeout: 1000
			})

			let query = {};
			if (this.state.user.name != 'RESMAN') {
				query = { estimator: this.state.user.name };
			}

			let resp = await this.state.store.SENDrequest({
				route: 'QUERYtracks',
				body: {
					data: query
				}
			});

			if (resp.success) {
				let list = sortarray(resp.data.tracks, -1, 'date')
				this.setState({
					quotes: list
				})
			}

			this.SetDropNote({
				showNote: true,
				level: resp.lvl,
				text: resp.msg,
				timeout: 2000
			})

			return resolve(resp)
		})
	}

	GetUserList() {
		this.state.store.SENDrequest({
			pack: {
				db: 'Company',
				collect: 'Employee_Account_Device',
				method: "QUERY",
				options: {
					query: {}                 // can't we query the collection for the VHP accounts directly?
				}
			},
			route: 'STORE',
			request: 'MART'
		}).then(answer => {
			if (answer.success) {
				let list = []
				for (let i = 0; i < answer.result.length; i++) {
					for (let j = 0; j < answer.result[i].Account.length; j++) {
						if (answer.result[i].Account[j].type == 'VHP') {
							list.push({
								text: answer.result[i].name,
								value: answer.result[i].Account[j].user
							})
						}
					}

				}
				this.setState({
					userList: list
				})
			}
		})
	}

	UpdateTracker(data) {
		return new Promise(async (resolve, reject) => {
			let quotes = Clone(this.state.quotes);

			let index = quotes.findIndex((element) => element.id = data.id);

			let resp = {};
			if (index != undefined) {
				resp = await this.state.store.SENDrequest({
					route: 'UPDATEtrack',
					body: {
						data: {
							query: data.id,
							update: data
						}
					}
				})

				quotes[index] = data;

				this.setState({
					quotes: quotes
				});
			} else {
				resp = { success: false, msg: 'Could not find Quote in Tracker List', lvl: 'red' }
			}

			this.SetDropNote({
				showNote: true,
				level: resp.lvl,
				text: resp.msg,
				timeout: 2000
			})
			return resolve(resp);
		})

		if (selectedLead > -1) {
			console.log("UPDATE:::::", data)
			for (let key in data) {
				if (quotes[selectedLead][key] !== undefined) {
					if (data[key].text != undefined) {
						quotes[selectedLead][key] = data[key].value
					} else {
						quotes[selectedLead][key] = data[key]
					}
				}
			}
			if (data.prstdate != null) {
				quotes[selectedLead].date = data.prstdate
			}
			if (this.state.dev == true) {
				this.setState({
					quotes: quotes
				})
			} else {
				//if(this.state.quotes[this.state.selectedLead].trackid){
				this.state.store.SENDrequest({
					pack: {
						db: 'Replacement',
						collect: 'Tracking350',
						method: "UPDATE",
						options: {
							query: { id: this.state.quotes[selectedLead].id },
							update: { ...quotes[selectedLead] }
						}
					},
					route: 'STORE',
					request: 'MART'
				}).then(answer => {
					if (answer.success) {
						this.SetDropNote({
							showNote: true,
							level: "green",
							text: "Tracker updated",
							timeout: 0
						})
						this.SetQuotes(quotes)
					} else {
						this.SetDropNote({
							showNote: true,
							level: "red",
							text: "Failed to update",
							timeout: 0
						})
					}
				})
			}
		}
	}

	/**
	 * Updates quotes without pushing to API
	 * @param {Array} quotes | an array containing quotes
	 */
	SetQuotes(quotes) {
		this.setState({
			quotes: quotes
		})
	}

	GetFilterCardData() {                              // this can be condensed a lot
		if (this.state.user.name == 'RESMAN') {
			return [
				{
					title: "Consultant",
					type: "DropDown",
					key: "estimator",
					list: this.state.userList
				},
				{
					title: "Status",
					type: "DropDown",
					key: "status",
					list: this.state.statusDrops
				},
				{
					title: "Stage",
					type: "DropDown",
					key: "stage",
					list: [
						{ text: "Job", value: "job" },
						{ text: "Quote", value: "quote" }
					]
				},
				{
					title: "Date",
					type: "DateRange",
					key: "date"
				},
				{
					title: "Amount",
					type: "NumRange",
					key: "amount"
				},
				{
					title: "Has Bids",
					type: "Length",
					key: "bids"
				}
			]
		}

		return [
			{
				title: "Status",
				type: "DropDown",
				key: "status",
				list: this.state.statusDrops
			},
			{
				title: "Stage",
				type: "DropDown",
				key: "stage",
				list: [
					{ text: "Job", value: "job" },
					{ text: "Quote", value: "quote" }
				]
			},
			{
				title: "Date",
				type: "DateRange",
				key: "date"
			},
			{
				title: "Amount",
				type: "NumRange",
				key: "amount"
			},
			{
				title: "Has Bids",
				type: "Length",
				key: "bids"
			}
		]
	}

	CreateStatusDrop(scheme) {
		let list = [];
		for (let stg in scheme) {
			for (let stat in scheme[stg].statuses) {
				list.push({
					text: scheme[stg].statuses[stat].name,
					value: stat,
					title: scheme[stg].statuses[stat].desc
				})
			}
		}
		return list;
	}

	GetApp() {
		return <ResidentialTracker
			settings={this.state.settings}
			quotes={FilterDataShallow(this.state.quotes, this.state.filters)}
			UpdateTracker={this.UpdateTracker}
			SetQuotes={this.SetQuotes}
			SetDropNote={this.SetDropNote}
			user={this.state.user}
			LogUserOut={this.props.LogUserOut}
			ToggleBoolean={this.ToggleBoolean}
			statusDrops={this.state.statusDrops}
		/>
	}

	RequestHelp() {
		if (window.ipcRenderer != undefined) {
			window.ipcRenderer.invoke(routeNames.getVerInfo).then(resp => {
				if (resp.success) {
					let app = resp.appinfo.name + ' - RRTracker';
					let version = resp.appinfo.version;
					let email = 'iamsupport@vogelheating.com';
					let subject = `Support Request - ${app}`;
					let body = `Application: ${app} - ${version}: ${tabs[this.state.currentTab]}`;
					window.location.assign(`mailto:${email}?subject=${subject}&body=${body}`);
				}
			})
		} else {                                                         // we CANNOT shortcut this
			let app = 'RRTracker';
			let version = 'Web';
			let email = 'iamsupport@vogelheating.com';
			let subject = `Support Request - ${app}`;
			let body = `Application: ${app} - ${version}: ${tabs[this.state.currentTab]}`;
			window.location.assign(`mailto:${email}?subject=${subject}&body=${body}`);
		}
	}

	render() {
		return (
			<>
				{this.GetApp()}
				<DropNote
					{...this.state.DropNoteProps}
					CloseNote={this.CloseNote}
				/>
				<BasicLoadingScreen
					text={this.state.loadingMsg}
					loading={this.state.loading}
				/>
				{this.state.filterActive && <FloatContainer>
					<DataFilterCard
						SetFilters={this.SetFilters}
						ResetFilters={this.ResetFilters}
						CloseFunction={this.ToggleBoolean}
						closeData="filterActive"
						filters={this.state.filters}
						data={this.GetFilterCardData()}
						title="Tracker"
					/>
				</FloatContainer>}
			</>
		);
	}
}