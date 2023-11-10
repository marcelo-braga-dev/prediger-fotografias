import LayoutCliente from "@/Layouts/ClienteLayout/LayoutCliente.jsx";

export default function () {
    return (
        <LayoutCliente>
            <div className="row justify-content-center">
                <div className="col-md-8 mt-4">
                    <h4>Contato</h4>
                    <h5>Entre em contato pelo email:</h5>
                    biancaprediger@hotmail.com
                </div>
            </div>
            <div className="row justify-content-center mt-4">
                <div className="col-md-8">
                    <span className="d-block fw-bold">
                        Caso tenha alguma dúvida, entre em contato pelo e-mail:
                    </span>
                    biancaprediger@hotmail.com
                </div>
            </div>
        </LayoutCliente>
    )
}
