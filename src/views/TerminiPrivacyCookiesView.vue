<template class="m-0">
    <section class="py-5">
        <div class="container container_TerminiPrivacyCookies">
            <h2 class="text-white text-center mt-4 mb-0">Termini & Condizioni</h2>
            <div class="card card_termini_condizioni p-3 mt-2">
                <h5>I Termini e Condizioni di DeliveBoo sono un accordo legale tra il titolare del sito e l’utente che
                    utilizza il servizio. Questi termini delineano le regole e le condizioni che l’utente deve accettare per
                    poter usufruire del servizio. Ecco alcuni punti essenziali dei Termini e Condizioni:</h5>
                <ul>
                    <li>Il sito web non è responsabile per eventuali danni causati dall’utilizzo del servizio.</li>
                    <li>Il sito web si riserva il diritto di modificare i Termini e Condizioni in qualsiasi momento senza
                        preavviso.</li>
                    <li>L’utente accetta di utilizzare il servizio solo per scopi leciti e non violare alcuna legge
                        applicabile.</li>
                    <li>Il sito web si riserva il diritto di sospendere o interrompere il servizio in qualsiasi momento
                        senza preavviso.</li>
                </ul>
            </div>
            <h2 class="text-white text-center mt-4 mb-0">Informazioni sulla privacy</h2>
            <div class="card card_informazioni_privacy p-3 mt-2">
                <h5>Le Informazioni sulla privacy di DeliveBoo descrivono come il sito web raccoglie, utilizza e protegge le
                    informazioni personali degli utenti. Ecco alcuni punti essenziali delle Informazioni sulla privacy:</h5>
                <ul>
                    <li>Questo sito web raccoglie informazioni personali come nome, indirizzo e-mail, indirizzo di
                        spedizione e numero di telefono.</li>
                    <li>Questo sito web utilizza queste informazioni per elaborare gli ordini degli utenti e migliorare il
                        servizio.</li>
                    <li>Questo sito web non condivide le informazioni personali degli utenti con terze parti a meno che non
                        sia richiesto dalla legge o necessario per elaborare gli ordini degli utenti.</li>
                    <li>Questo sito web utilizza i cookie per migliorare l’esperienza dell’utente sul sito web.</li>
                </ul>
            </div>
            <h2 class="text-white text-center mt-4 mb-0">Cookies</h2>
            <div class="card card_cookies p-3 mt-2">
                <h5>I Cookies di DeliveBoo sono piccoli file di testo che vengono salvati sul computer dell’utente quando
                    visita il sito web. Ecco alcuni punti essenziali sui Cookies:</h5>
                <ul>
                    <li>Questo sito web utilizza i Cookies per migliorare l’esperienza dell’utente</li>
                    <li>I Cookies di questo sito web non contengono informazioni personali dell’utente.</li>
                    <li>L’utente può scegliere di disabilitare i Cookies nel proprio browser, ma ciò potrebbe limitare
                        alcune funzionalità del sito web.</li>
                </ul>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@use '../assets/scss/partials/variables' as *;

section {
    min-height: 100vh;
}

.container_TerminiPrivacyCookies {

    .card_termini_condizioni:hover,
    .card_informazioni_privacy:hover,
    .card_cookies:hover {
        background-color: rgb(222, 255, 222);
        border-radius: 5px;
    }
}</style>
  

