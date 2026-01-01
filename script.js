// Fungsi untuk mengelola teks berjalan
document.addEventListener('DOMContentLoaded', function() {
    // Element yang diperlukan
    const marqueeText = document.getElementById('marqueeText');
    const editTextBtn = document.getElementById('editTextBtn');
    const textEditor = document.getElementById('textEditor');
    const newMarqueeText = document.getElementById('newMarqueeText');
    const saveTextBtn = document.getElementById('saveTextBtn');
    const resetTextBtn = document.getElementById('resetTextBtn');
    
    // Teks default
    const defaultText = "SELAMAT DATANG DI WEBSITE FAJRUSH, SELAMAT TAHUN BARU 2026 DAN SELAMAT HARI RAYA NATAL 2025";
    
    // Cek apakah ada teks yang disimpan di localStorage
    const savedText = localStorage.getItem('fajrushMarqueeText');
    if (savedText) {
        marqueeText.textContent = savedText;
    }
    
    // Toggle editor teks
    editTextBtn.addEventListener('click', function() {
        textEditor.classList.toggle('hidden');
        
        if (!textEditor.classList.contains('hidden')) {
            newMarqueeText.value = marqueeText.textContent;
            newMarqueeText.focus();
        }
    });
    
    // Simpan teks baru
    saveTextBtn.addEventListener('click', function() {
        const newText = newMarqueeText.value.trim();
        
        if (newText) {
            marqueeText.textContent = newText;
            localStorage.setItem('fajrushMarqueeText', newText);
            textEditor.classList.add('hidden');
            
            // Tampilkan notifikasi
            showNotification("Teks berhasil diperbarui!");
        } else {
            alert("Silakan masukkan teks baru!");
            newMarqueeText.focus();
        }
    });
    
    // Reset ke teks default
    resetTextBtn.addEventListener('click', function() {
        if (confirm("Apakah Anda yakin ingin mengembalikan teks ke default?")) {
            marqueeText.textContent = defaultText;
            localStorage.removeItem('fajrushMarqueeText');
            textEditor.classList.add('hidden');
            
            // Tampilkan notifikasi
            showNotification("Teks telah dikembalikan ke default!");
        }
    });
    
    // Fungsi untuk menampilkan notifikasi
    function showNotification(message) {
        // Cek apakah sudah ada notifikasi
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Buat elemen notifikasi
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        // Tambahkan styling untuk notifikasi
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(90deg, #00cc66, #00ccff);
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            font-family: 'Rajdhani', sans-serif;
            font-weight: 600;
            z-index: 1000;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            animation: slideIn 0.5s ease, fadeOut 0.5s ease 2.5s forwards;
        `;
        
        // Tambahkan keyframe animasi
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(styleSheet);
        
        // Tambahkan notifikasi ke body
        document.body.appendChild(notification);
        
        // Hapus notifikasi setelah 3 detik
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }
    
    // Efek hover untuk link-card
    const linkCards = document.querySelectorAll('.link-card:not(.coming-soon)');
    linkCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // Efek kursor khusus
    document.body.style.cursor = "default";
    
    // Tambahkan efek kustom untuk kursor di atas elemen interaktif
    const interactiveElements = document.querySelectorAll('button, a, .link-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.style.cursor = "pointer";
        });
        
        el.addEventListener('mouseleave', () => {
            document.body.style.cursor = "default";
        });
    });
});
