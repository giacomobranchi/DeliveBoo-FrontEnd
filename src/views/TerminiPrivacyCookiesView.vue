<template class="m-0">

  <div class="container-fluid  container_TerminiPrivacyCookies py-3">
      <div class="container ">
        <h1 class="text-white pt-3">Termini & Condizioni</h1>
        <div class="card card_termini_condizioni p-3 mt-4">
          <h5>I Termini e Condizioni di DeliveBoo sono un accordo legale tra il titolare del sito e l’utente che utilizza il servizio. Questi termini delineano le regole e le condizioni che l’utente deve accettare per poter usufruire del servizio. Ecco alcuni punti essenziali dei Termini e Condizioni:</h5>
          <ul>
            <li>Il sito web non è responsabile per eventuali danni causati dall’utilizzo del servizio.</li>
            <li>Il sito web si riserva il diritto di modificare i Termini e Condizioni in qualsiasi momento senza preavviso.</li>
            <li>L’utente accetta di utilizzare il servizio solo per scopi leciti e non violare alcuna legge applicabile.</li>
            <li>Il sito web si riserva il diritto di sospendere o interrompere il servizio in qualsiasi momento senza preavviso.</li>
          </ul>
        </div>
        <h1 class="text-white pt-3">Informazioni sulla privacy</h1>
        <div class="card card_informazioni_privacy p-3 mt-4">
          <h5>Le Informazioni sulla privacy di DeliveBoo descrivono come il sito web raccoglie, utilizza e protegge le informazioni personali degli utenti. Ecco alcuni punti essenziali delle Informazioni sulla privacy:</h5>
          <ul>
            <li>Questo sito web raccoglie informazioni personali come nome, indirizzo e-mail, indirizzo di spedizione e numero di telefono.</li>
            <li>Questo sito web utilizza queste informazioni per elaborare gli ordini degli utenti e migliorare il servizio.</li>
            <li>Questo sito web non condivide le informazioni personali degli utenti con terze parti a meno che non sia richiesto dalla legge o necessario per elaborare gli ordini degli utenti.</li>
            <li>Questo sito web utilizza i cookie per migliorare l’esperienza dell’utente sul sito web.</li>
          </ul>
        </div>
        <h1 class="text-white pt-3">Cookies</h1>
        <div class="card card_cookies p-3 mt-4 mb-5">
          <h5>I Cookies di DeliveBoo sono piccoli file di testo che vengono salvati sul computer dell’utente quando visita il sito web. Ecco alcuni punti essenziali sui Cookies:</h5>
          <ul>
            <li>Questo sito web utilizza i Cookies per migliorare l’esperienza dell’utente</li>
            <li>I Cookies di questo sito web non contengono informazioni personali dell’utente.</li>
            <li>L’utente può scegliere di disabilitare i Cookies nel proprio browser, ma ciò potrebbe limitare alcune funzionalità del sito web.</li>
          </ul>
        </div>
        
      </div>

  </div>
  
  
</template>

<style lang="scss" scoped>
@use '../assets/scss/partials/variables' as *;

.container_TerminiPrivacyCookies {
  background-color: $d_boo_primary;
  min-height: 100vh;
  text-align: center;
  .card_termini_condizioni:hover, .card_informazioni_privacy:hover, .card_cookies:hover {
      background-color: antiquewhite;
      border-radius: 5px;
    }  
    .card_termini_condizioni, .card_informazioni_privacy, .card_cookies {
       text-align: left; 
    }
}

</style>
  

