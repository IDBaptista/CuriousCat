class CuriousCats {
    constructor() {
        this.apiUrl = 'https://meowfacts.herokuapp.com/?lang=por-br';
        this.searchBtn = document.getElementById('searchBtn');
        this.loading = document.getElementById('loading');
        this.factCards = [
            document.getElementById('fact1'),
            document.getElementById('fact2'),
            document.getElementById('fact3')
        ];
        this.cardElements = [
            document.getElementById('card1'),
            document.getElementById('card2'),
            document.getElementById('card3')
        ];
        this.searchInput = document.querySelector('.search-input');
        this.currentFacts = [];
        this.isLoading = false;
        
        this.init();
    }

    init() {
        this.searchBtn.addEventListener('click', () => this.fetchCatFacts());
        this.searchInput.addEventListener('click', () => this.fetchCatFacts());
        
        // Adicionar efeito de digitação no placeholder
        this.typewriterEffect();
        
        // Carregar fatos iniciais após um pequeno delay
        setTimeout(() => {
            this.fetchCatFacts();
        }, 1000);
    }

    async fetchCatFacts() {
        if (this.isLoading) return;
        
        this.isLoading = true;
        this.showLoading();
        
        try {
            // Buscar 3 fatos diferentes
            const promises = [];
            for (let i = 0; i < 3; i++) {
                promises.push(this.fetchSingleFact());
            }
            
            const results = await Promise.all(promises);
            this.currentFacts = results.map(result => result.data[0]);
            
            this.hideLoading();
            this.updateCards();
            this.updateSearchInput();
            
        } catch (error) {
            console.error('Erro ao buscar fatos sobre gatos:', error);
            this.hideLoading();
            this.showError();
        }
        
        this.isLoading = false;
    }

    async fetchSingleFact() {
        const response = await fetch(this.apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    }

    updateCards() {
        this.factCards.forEach((card, index) => {
            if (this.currentFacts[index]) {
                // Traduzir o fato para português (simulação básica)
                const translatedFact = this.translateFact(this.currentFacts[index]);
                
                // Adicionar animação de fade out
                this.cardElements[index].style.opacity = '0';
                this.cardElements[index].style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    card.textContent = translatedFact;
                    this.cardElements[index].classList.add('fade-in');
                    this.cardElements[index].style.opacity = '1';
                    this.cardElements[index].style.transform = 'translateY(0)';
                }, 300);
            }
        });
    }

    translateFact(fact) {
        // Tradução básica de alguns termos comuns (em um projeto real, usaria uma API de tradução)
        const translations = {
            'cat': 'gato',
            'cats': 'gatos',
            'kitten': 'gatinho',
            'kittens': 'gatinhos',
            'mother': 'mãe',
            'father': 'pai',
            'litter box': 'caixa de areia',
            'whiskers': 'bigodes',
            'tail': 'cauda',
            'paws': 'patas',
            'meow': 'miau',
            'purr': 'ronronar',
            'sleep': 'dormir',
            'hunt': 'caçar',
            'play': 'brincar',
            'years': 'anos',
            'year': 'ano',
            'hours': 'horas',
            'hour': 'hora',
            'day': 'dia',
            'days': 'dias',
            'night': 'noite',
            'food': 'comida',
            'water': 'água',
            'milk': 'leite',
            'fish': 'peixe',
            'mouse': 'rato',
            'mice': 'ratos',
            'bird': 'pássaro',
            'birds': 'pássaros',
            'house': 'casa',
            'home': 'lar',
            'owner': 'dono',
            'human': 'humano',
            'humans': 'humanos',
            'love': 'amor',
            'pet': 'animal de estimação',
            'pets': 'animais de estimação'
        };

        let translatedFact = fact;
        
        // Aplicar traduções básicas
        Object.keys(translations).forEach(english => {
            const portuguese = translations[english];
            const regex = new RegExp(`\\b${english}\\b`, 'gi');
            translatedFact = translatedFact.replace(regex, portuguese);
        });

        return translatedFact;
    }

    updateSearchInput() {
        const messages = [
            "Novos fatos descobertos! Clique novamente para mais...",
            "Que interessante! Quer saber mais sobre gatos?",
            "Incrível, não é? Descubra mais curiosidades!",
            "Surpreendente! Clique para continuar explorando...",
            "Fascinante! Há muito mais para descobrir..."
        ];
    }

    showLoading() {
        this.loading.style.display = 'block';
        this.searchBtn.disabled = true;
        this.searchBtn.style.opacity = '0.6';
        this.searchBtn.style.cursor = 'not-allowed';
    }

    hideLoading() {
        this.loading.style.display = 'none';
        this.searchBtn.disabled = false;
        this.searchBtn.style.opacity = '1';
        this.searchBtn.style.cursor = 'pointer';
    }

    showError() {
        this.factCards.forEach((card, index) => {
            card.textContent = `Ops! Não foi possível carregar os fatos sobre gatos. Tente novamente em alguns instantes.`;
            this.cardElements[index].style.background = '#e74c3c';
        });
        
        this.searchInput.placeholder = "Erro ao carregar. Clique para tentar novamente...";
        
        // Restaurar cor original após 3 segundos
        setTimeout(() => {
            this.cardElements.forEach(card => {
                card.style.background = '#f39c12';
            });
        }, 3000);
    }

    typewriterEffect() {
        const originalText = "Clique para descobrir um fato sobre gatos...";
        const speed = 100;
        let i = 0;
        
        this.searchInput.placeholder = "";
        
        const typeWriter = () => {
            if (i < originalText.length) {
                this.searchInput.placeholder += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            }
        };
        
        setTimeout(typeWriter, 500);
    }

    // Método para adicionar efeitos visuais extras
    addVisualEffects() {
        // Efeito de partículas de pegadas ao clicar
        this.searchBtn.addEventListener('click', (e) => {
            this.createPawParticles(e.target);
        });
    }
}

// Inicializar a aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    const app = new CuriousCats();
    app.addVisualEffects();
});


