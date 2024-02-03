/**
 * A button which has an image and optional text.
 * @param {Function} ClickFunction | the function called by clicking.
 * @param {URL} src | the link to the image.
 * @param {String} text | optional text associated with the button.
 * @param {String} id | the ID of the button
 * @param {String} title | the title of the button, shown on hover.
 * @returns the data passed into the component
 */
export default function ImageButton({
    ClickFunction,
    src,
    text = undefined,
    id = undefined,
    title = undefined
}) {

    return (
        <button
            onClick={ClickFunction(!collapsed)}
            className="image-button"
            id={id}
            title={title}
        >
            <img src={src} className="image-button-icon"></img>
            {text && <div>{text}</div>}
        </button>
    )
}