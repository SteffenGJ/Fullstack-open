const Notification = ({message}) => {

    if (!message) {
        return null;
    }

    return (
        <div className="noti">
            <p>{message}</p>
        </div>
    )
}

export default Notification;