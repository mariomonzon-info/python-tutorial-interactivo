// Variables globales
let currentLesson = 0;
let completedLessons = new Set();
let totalLessons = 12;

// Función principal para mostrar lecciones
function showLesson(lessonIndex) {
    // Ocultar todas las lecciones
    document.querySelectorAll('.lesson-content').forEach(lesson => {
        lesson.classList.remove('active');
    });
    
    // Mostrar la lección seleccionada
    document.getElementById(`lesson-${lessonIndex}`).classList.add('active');
    
    // Actualizar botones de navegación
    document.querySelectorAll('.lesson-btn').forEach((btn, index) => {
        btn.classList.remove('active');
        if (index === lessonIndex) {
            btn.classList.add('active');
        }
    });
    
    currentLesson = lessonIndex;
    updateProgress();
    updateNavigationButtons();
}

// Actualizar barra de progreso
function updateProgress() {
    const progress = ((currentLesson + 1) / totalLessons) * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;
    document.getElementById('progressText').textContent = 
        `Lección ${currentLesson + 1} de ${totalLessons} - ${getProgressMessage()}`;
}

// Mensajes de progreso
function getProgressMessage() {
    const messages = [
        "¡Empezamos con Python!",
        "Aprendiendo variables 📦",
        "Dominando tipos de datos 🎯",
        "Explorando listas 📋",
        "Tomando decisiones 🤔",
        "Controlando bucles 🔄",
        "Creando funciones ⚙️",
        "Estructurando datos 📖",
        "Programando objetos 🏗️",
        "Organizando código 📦",
        "Manejando errores 🚨",
        "¡Desarrollo web! 🌐"
    ];
    return messages[currentLesson] || "¡Genial!";
}

// Actualizar botones de navegación
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn && nextBtn) {
        prevBtn.disabled = currentLesson === 0;
        nextBtn.disabled = currentLesson === totalLessons - 1;
        
        if (currentLesson === totalLessons - 1) {
            nextBtn.textContent = "¡Terminado! 🎉";
        } else {
            nextBtn.textContent = "Siguiente →";
        }
    }
}

// Navegar a la siguiente lección
function nextLesson() {
    if (currentLesson < totalLessons - 1) {
        markLessonCompleted(currentLesson);
        showLesson(currentLesson + 1);
        playSound('click');
    }
}

// Navegar a la lección anterior
function previousLesson() {
    if (currentLesson > 0) {
        showLesson(currentLesson - 1);
        playSound('click');
    }
}

// Marcar lección como completada
function markLessonCompleted(lessonIndex) {
    completedLessons.add(lessonIndex);
    const lessonBtn = document.querySelectorAll('.lesson-btn')[lessonIndex];
    if (lessonBtn) {
        lessonBtn.classList.add('completed');
    }
    
    // Mostrar logro
    const achievement = document.getElementById(`achievement-${lessonIndex}`) || 
                       document.getElementById('achievement-final');
    if (achievement) {
        achievement.classList.add('show');
    }
}

// Manejar selección de opciones de quiz
function selectQuizOption(element, isCorrect) {
    const quizContainer = element.closest('.interactive-quiz');
    const options = quizContainer.querySelectorAll('.quiz-option');
    const feedback = quizContainer.querySelector('.quiz-feedback');
    
    // Remover selección previa
    options.forEach(option => {
        option.classList.remove('selected', 'correct', 'incorrect');
    });
    
    // Marcar opción seleccionada
    element.classList.add('selected');
    
    // Mostrar resultado después de un momento
    setTimeout(() => {
        if (isCorrect) {
            element.classList.add('correct');
            feedback.textContent = "¡Correcto! 🎉 ¡Excelente comprensión!";
            feedback.className = "quiz-feedback correct";
            feedback.style.display = "block";
            playSound('success');
            
            // Marcar progreso si es la última pregunta de la lección
            setTimeout(() => {
                if (!completedLessons.has(currentLesson)) {
                    markLessonCompleted(currentLesson);
                }
            }, 1000);
        } else {
            element.classList.add('incorrect');
            feedback.textContent = "No es correcto 😅 ¡Pero el aprendizaje es un proceso!";
            feedback.className = "quiz-feedback incorrect";
            feedback.style.display = "block";
            playSound('error');
        }
    }, 500);
}

// Ejecutar código simple
function runSimpleCode(editorNumber) {
    const editor = document.querySelectorAll('.editor-input')[editorNumber - 1];
    const output = document.getElementById(`output-${editorNumber}`);
    
    if (!editor || !output) return;
    
    const code = editor.value;
    
    if (!code.trim()) {
        output.textContent = "Escribe algo de código para ejecutar 🐍";