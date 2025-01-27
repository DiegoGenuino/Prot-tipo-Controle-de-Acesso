const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('imagem');
const imagePreview = document.getElementById('imagePreview');

// Função para manipular o upload do arquivo
function handleFileUpload() {
    const file = fileInput.files[0];

    if (file) {
        uploadArea.classList.add('uploaded');
        uploadArea.querySelector('label').innerText = "Imagem carregada com sucesso!";

        // Verifica se o arquivo é uma imagem
        if (!file.type.startsWith('image/')) {
            alert('Por favor, envie um arquivo de imagem válido.');
            fileInput.value = ''; // Reseta o input
            return;
        }

        // Cria a pré-visualização da imagem
        const reader = new FileReader();
        reader.onload = function (e) {
            const imgElement = document.createElement('img');
            imgElement.src = e.target.result;
            imgElement.alt = "Pré-visualização da imagem enviada";
            imagePreview.innerHTML = '';
            imagePreview.appendChild(imgElement);
            imagePreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
}

// Evento: arrastar arquivo sobre a área
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('active');
});

// Evento: sair da área de upload
uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('active');
});

// Evento: soltar o arquivo na área
uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('active');

    const files = e.dataTransfer.files;
    if (files.length > 0) {
        fileInput.files = files;
        handleFileUpload();
    }
});

// Evento: clique na área para abrir o seletor de arquivos
uploadArea.addEventListener('click', () => {
    fileInput.click();
});

// Evento: passar o mouse sobre a área com uma imagem carregada
uploadArea.addEventListener('mouseenter', () => {
    if (imagePreview.style.display === 'block') {
        uploadArea.classList.add('hovered');
    }
});

// Evento: sair da área ao passar o mouse
uploadArea.addEventListener('mouseleave', () => {
    uploadArea.classList.remove('hovered');
});

// Evento: mudança no input de arquivo
fileInput.addEventListener('change', handleFileUpload);
