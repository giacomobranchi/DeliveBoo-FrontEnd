<template class="m-0">
    <section class="py-5">
        <div class="container container_FAQ">
            <h1 class="text-white text-center">FAQ</h1>
            <h2 class="text-white text-center">Domande frequenti</h2>
            <div class="card card_FAQ p-3 mt-4">
                <h3 class="faq-question">Come posso contattare il supporto?</h3>
                <div class="faq-answer">
                    Puoi contattare il nostro supporto tramite email all'indirizzo supporto@esempio.com o chiamando il
                    numero +1-555-555-5555.
                </div>
            </div>
            <div class="card card_FAQ p-3 mt-4">
                <h3 class="faq-question">Quali sono i metodi di pagamento accettati?</h3>
                <div class="faq-answer">
                    Accettiamo pagamenti con carta di credito, PayPal e bonifico bancario.
                </div>
            </div>
            <div class="card card_FAQ p-3 mt-4">
                <h3 class="faq-question">Quanto tempo ci vuole per la consegna?</h3>
                <div class="faq-answer">
                    La consegna richiede generalmente 30-50 minuti.
                </div>
            </div>
            <div class="card card_FAQ p-3 mt-4">
                <h3 class="faq-question">Come funziona il servizio di consegna a domicilio?</h3>
                <div class="faq-answer">
                    Il servizio di consegna a domicilio è un servizio che consiste nel trasporto di merce dal luogo di
                    vendita originale a quello in cui il cliente consumerà il cibo. Si differenzia dall’asporto, che invece
                    prevede il ritiro della merce direttamente dal luogo di vendita e non implica alcun tipo di consegna.
                </div>
            </div>
            <div class="card card_FAQ p-3 mt-4">
                <h3 class="faq-question">Come posso far crescere la mia attività?</h3>
                <div class="faq-answer">
                    Cerca di distinguerti dalla concorrenza offrendo un prodotto o servizio unico e di alta qualità. Spero
                    che questo consiglio ti sia stato utile! Se hai bisogno di ulteriore assistenza, non esitare a chiedere.
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@use '../assets/scss/partials/variables' as *;

section {
    min-height: 100vh;

}

.container_FAQ {
    .card_FAQ:hover {
        background-color: rgb(222, 255, 222);
        border-radius: 5px;
    }
}
</style>
  

