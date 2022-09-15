import "../styles/configuration-page.scss";

const ApiKeysPage = ({ activePlace }) => {
    return (
        <div className="api-links">
            <div>
                <span>Link do strony rezerwacji dla twojego miejsca: </span>
            </div>
            <div>

                <a href={`${window.location.origin}/addreservation?place=${activePlace}`}><strong>{`${window.location.origin}/addreservation?place=${activePlace}`}</strong></a>
            </div>
            <p>
                Aby dodać link na swojej stronie:
                Skopiuj powyższy link i umieść w łączu na swojej stronie.
            </p>
        </div>

    );
}

export default ApiKeysPage;