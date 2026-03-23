/**
 * PORTFÓLIO PESSOAL - FUNDAMENTOS DA PROGRAMAÇÃO WEB
 * JavaScript puro - sem frameworks ou bibliotecas
 */

(function() {
    'use strict';

    /* ========== ELEMENTOS DO DOM ========== */
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const themeToggle = document.getElementById('themeToggle');
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    /* ========== MENU RESPONSIVO (MOBILE) ========== */
    /**
     * Abre/fecha o menu hamburguer em dispositivos móveis.
     * Adiciona/remove classes para animação e acessibilidade.
     */
    function toggleMenu() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        // Previne scroll do body quando menu está aberto
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }

    // Evento de clique no botão hamburguer
    if (navToggle) {
        navToggle.addEventListener('click', toggleMenu);
    }

    // Fecha o menu ao clicar em um link (âncora) - para single page
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    /* ========== ALTERNAR TEMA ESCURO/CLARO ========== */
    /**
     * Alterna entre tema claro e escuro.
     * Salva preferência no localStorage para persistir entre sessões.
     */
    function initTheme() {
        const savedTheme = localStorage.getItem('portfolio-theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('theme-dark');
        } else if (savedTheme === 'light') {
            document.body.classList.remove('theme-dark');
        }
        // Se não houver preferência salva, usa o tema padrão (claro)
    }

    function toggleTheme() {
        document.body.classList.toggle('theme-dark');
        const isDark = document.body.classList.contains('theme-dark');
        localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Inicializa o tema ao carregar a página
    initTheme();

    /* ========== VALIDAÇÃO DO FORMULÁRIO ========== */
    /**
     * Valida se o campo não está vazio (apenas espaços em branco)
     * @param {string} value - Valor do campo
     * @returns {boolean} - true se válido
     */
    function isEmpty(value) {
        return !value || value.trim().length === 0;
    }

    /**
     * Valida formato de e-mail usando expressão regular
     * @param {string} email - E-mail a validar
     * @returns {boolean} - true se formato válido
     */
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Exibe mensagem de erro em um campo do formulário
     * @param {HTMLElement} inputElement - Elemento input/textarea
     * @param {HTMLElement} errorElement - Elemento que exibe o erro
     * @param {string} message - Mensagem de erro
     */
    function showFieldError(inputElement, errorElement, message) {
        inputElement.classList.add('error');
        errorElement.textContent = message;
    }

    /**
     * Remove mensagem de erro de um campo
     * @param {HTMLElement} inputElement - Elemento input/textarea
     * @param {HTMLElement} errorElement - Elemento que exibe o erro
     */
    function clearFieldError(inputElement, errorElement) {
        inputElement.classList.remove('error');
        errorElement.textContent = '';
    }

    /**
     * Limpa todos os erros do formulário
     */
    function clearAllErrors() {
        const errorElements = document.querySelectorAll('.form__error');
        const inputElements = document.querySelectorAll('.form__input');
        errorElements.forEach(function(el) { el.textContent = ''; });
        inputElements.forEach(function(el) { el.classList.remove('error'); });
    }

    /**
     * Valida todo o formulário antes do envio
     * @returns {boolean} - true se todos os campos forem válidos
     */
    function validateForm() {
        const nomeInput = document.getElementById('nome');
        const emailInput = document.getElementById('email');
        const mensagemInput = document.getElementById('mensagem');
        const nomeError = document.getElementById('nomeError');
        const emailError = document.getElementById('emailError');
        const mensagemError = document.getElementById('mensagemError');

        let isValid = true;

        // Limpa erros anteriores
        clearAllErrors();

        // Validação do nome - não pode estar vazio
        if (isEmpty(nomeInput.value)) {
            showFieldError(nomeInput, nomeError, 'Por favor, preencha seu nome.');
            isValid = false;
        }

        // Validação do e-mail - não pode estar vazio
        if (isEmpty(emailInput.value)) {
            showFieldError(emailInput, emailError, 'Por favor, preencha seu e-mail.');
            isValid = false;
        } else if (!isValidEmail(emailInput.value)) {
            // Validação do formato do e-mail
            showFieldError(emailInput, emailError, 'Por favor, insira um e-mail válido.');
            isValid = false;
        }

        // Validação da mensagem - não pode estar vazia
        if (isEmpty(mensagemInput.value)) {
            showFieldError(mensagemInput, mensagemError, 'Por favor, preencha a mensagem.');
            isValid = false;
        }

        return isValid;
    }

    /**
     * Limpa os campos do formulário após envio bem-sucedido
     */
    function clearFormFields() {
        contactForm.reset();
        clearAllErrors();
    }

    /**
     * Exibe a mensagem de sucesso e oculta após alguns segundos
     */
    function showSuccessMessage() {
        formSuccess.classList.add('visible');
        // Rolagem suave até a mensagem de sucesso
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Oculta a mensagem após 5 segundos
        setTimeout(function() {
            formSuccess.classList.remove('visible');
        }, 5000);
    }

    /**
     * Simula o envio do formulário (sem backend real)
     * Em um projeto real, aqui seria feita a requisição para um servidor
     */
    function handleFormSubmit(event) {
        event.preventDefault();

        // Valida o formulário - não permite envio com campos vazios ou inválidos
        if (!validateForm()) {
            return;
        }

        // Simulação de envio (em produção, usar fetch ou XMLHttpRequest para API)
        // Por ser atividade acadêmica, apenas simula o comportamento esperado
        clearFormFields();
        showSuccessMessage();
    }

    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    /* ========== REMOVER ERRO AO DIGITAR (UX) ========== */
    /**
     * Remove a mensagem de erro quando o usuário começa a digitar no campo
     */
    const formInputs = document.querySelectorAll('#nome, #email, #mensagem');
    formInputs.forEach(function(input) {
        const errorId = input.id + 'Error';
        const errorEl = document.getElementById(errorId);
        if (errorEl) {
            input.addEventListener('input', function() {
                clearFieldError(input, errorEl);
            });
        }
    });

})();
