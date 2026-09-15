export default function Inicio() {
    return (
        <main className="page page-center">
            <section className="home-card">

                <div className="brand-logo">
                    GD
                </div>

                <p className="brand-name">
                    GRUPO DAROS
                </p>

                <h1>
                    Verificación digital
                </h1>

                <p className="home-description">
                    Este sitio permite consultar y verificar información
                    generada por nuestros sistemas.
                </p>

                <div className="qr-message">
                    <div className="qr-icon">
                        ▦
                    </div>

                    <div>
                        <strong>
                            Escanea tu código QR
                        </strong>

                        <p>
                            Utiliza la cámara de tu teléfono para abrir
                            directamente la información correspondiente.
                        </p>
                    </div>
                </div>

                <footer className="home-footer">
                    Grupo Daros
                </footer>

            </section>
        </main>
    );
}