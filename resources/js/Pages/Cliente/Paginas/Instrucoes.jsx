import LayoutCliente from "@/Layouts/ClienteLayout/LayoutCliente.jsx";

export default function () {
    return (
        <LayoutCliente>
            <div className="row justify-content-center">
                <div className="col-md-8 mt-4">
                    <h4>Instruções de Uso</h4>
                    <h6>Ampliando fotos</h6>
                    <p>Para ver uma foto em tamanho maior, clique sobre a miniatura da mesma.</p>

                    <h6>Selecionando fotos</h6>
                    <p>Marque as fotos que mais gostou clicando em SELECIONAR</p>

                    <h6>Finalizando a seleção</h6>
                    <p>Após selecionar todas as fotos desejadas, clique no botão
                        "FINALIZAR SELEÇÃO" localizado no canto
                        inferior direito da tela.
                    </p>
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
