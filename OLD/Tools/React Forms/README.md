# React Forms

Install using ***npm install vhp-forms-library***

The forms library contains a number of reusable forms and form parts that can be used in creating forms and other applications.

## *Form Parts*

Form Parts are reusable react components which can be used to create full forms.

**TextAeaStubForm**: The TextAreaStub form component provides a basic template for creating subject/body forms, where the first part of the form is a TextInput and the second part is a TextArea.

>*ChangeFunction*: ***Function*** | the ChangeFunction assigned to each form item, triggered on input of a form item.

>*subjectLine*: ***String*** | the title of the subject field.

>*subject*: ***String*** | the initial starting value of the subject field.

>*subjectKey*: ***String*** | the property name associated with the subject property in the parent container.

>*bodyLine*: ***String*** | the title of the body field.

>*body*: ***String*** | the initial starting value of the body field.

>*bodyKey*: ***String*** | the property name associated with the body property in the parent container.

>*formReqs*: ***Object*** | optional table containing the formReqs for requiring input to be filled.
---

**TechnicianInformation**: The TechnicianInformation form is a simple form stub which contains fields for filling out technician information on a customer facing form.

>*SetProperty*: ***Function*** | the ChangeFunction assigned to each form item, triggered on input of a form item.

>*technician*: ***String*** | the initial value of the form Technician field.
---
**SupportRequestInformation**: The SupportRequestInformation form component provides a basic template for creating user support forms and directing users towards a specific support flow or in-app support process.

>*ChangeFunction*: ***Function*** | the ChangeFunction assigned to each form item, triggered on input of a form item.

>*department*: ***Text,Value*** | the text,value pair which describes the default state of the department DropDown.

>*departmentList*: ***Array*** | an array containing text,value pairs used in the department DropDown.

>*type*: ***Text,Value*** | the text,value pair which describes the default state of the type DropDown.

>*typeList*: ***Array*** | an array containing text,value pairs used in the type DropDown.

>*category*: ***Text,Value*** | the text,value pair which describes the default state of the category DropDown.

>*categoryList*: ***Array*** | an array containing text,value pairs used in the category DropDown.

>*priority*: ***Text,Value*** | the text,value pair which describes the default state of the type DropDown. Text describes the priority while value maps to the corresponding urgency in Teams.

>*priorityList*: ***Array*** | an array containing text,value pairs used in the type DropDown.

>*showDates*: ***Boolean*** | determines whether to show an ask date and an expect date in the form.

>*askDate*: ***String*** | the initial value which fills into the askDate field.

>*expectDate*: ***String*** | the initial value which fills into the expectDate field.

>*formReqs*: ***Object*** | optional table containing the formReqs for requiring input to be filled.
---
**EmployeeInformation**: The EmployeeInformation form component provides a basic template for filling out basic employee information.

>*ChangeFunction*: ***Function*** | the ChangeFunction assigned to each form item, triggered on input of a form item.

>*user*: ***String*** | the initial value of the user field.

>*first*: ***String*** | the initial value of the first name field.

>*last*: ***String*** | the initial value of the last name field.

>*phone*: ***String*** | the initial value of the phone number field.

>*email*: ***String*** | the initial value of the email field.

>*formReqs*: ***Object*** | optional table containing the formReqs for requiring input to be filled.
---
**CustomerInformation**: The CustomerInformation form component provides a basic template for filling out basic customer information, with the option of including contact and address information.

>*ChangeFunction*: ***Function*** | the ChangeFunction assigned to each form item, triggered on input of a form item.

>*ContactInformation*: ***Boolean*** | determines whether to provide the contact information fields

>*AddressInformation*: ***Boolean*** | determines whether to provide the address information fields

>*customerName*: ***String*** | the initial value of the customer name field.

>*date*: ***String*** | the initial value of the date field, using HTML input type *date*.

>*phone*: ***String*** | the initial value of the phone number field, located in the ContactInformation section.

>*email*: ***String*** | the initial value of the email field, located in the ContactInformation section.

>*address*: ***String*** | the initial value of the address field, located in the AddressInformation section.

>*city*: ***String*** | the initial value of the city field, located in the AddressInformation section.

>*zip*: ***String*** | the initial value of the zip code field, located in the AddressInformation section.

>*formReqs*: ***Object*** | optional table containing the formReqs for requiring input to be filled.
---