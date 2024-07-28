import { useRouteError } from "react-router-dom";

export const ErrorPage = () => {
    const error = useRouteError();

    return (
        <div className="error-page">
            <h4>Oooops!</h4>
            <p>an error has occured...</p>

            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    )
}