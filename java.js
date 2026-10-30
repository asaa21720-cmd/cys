function caesarShiftChar(ch, shift) {
    const isUpper = ch >= 'A' && ch <= 'Z';
    const isLower = ch >= 'a' && ch <= 'z';
    if (!isUpper && !isLower) return ch;

    const base = isUpper ? 'A' : 'a';
    const code = ch.charCodeAt(0) - base.charCodeAt(0);
    const newCode = (code + shift + 26) % 26;
    return String.fromCharCode(newCode + base.charCodeAt(0));
}

function runCaesar() {
    const text = document.getElementById('caesarInput').value;
    let shift = Number(document.getElementById('caesarShift').value) || 0;
    const mode = document.getElementById('caesarMode').value;

    // خفّف shift ضمن 0..25
    shift = ((shift % 26) + 26) % 26;

    let out = '';
    if (mode === 'encrypt') {
        for (const ch of text) out += caesarShiftChar(ch, shift);
    } else {
        for (const ch of text) out += caesarShiftChar(ch, -shift);
    }

    document.getElementById('caesarOutput').value = out;
}

function bytesToBase64(bytes) {
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) binary += String.fromCharCode(bytes[i]);
    return btoa(binary);
}

async function runHash() {
    const text = document.getElementById('hashInput').value;
    const algo = document.getElementById('hashAlgo').value; // SHA-256 or SHA-512
    const format = document.getElementById('hashFormat').value; // hex or base64

    const enc = new TextEncoder();
    const data = enc.encode(text);

    const digest = await crypto.subtle.digest(algo, data); // ArrayBuffer
    const bytes = new Uint8Array(digest);

    let output = '';
    if (format === 'base64') {
        output = bytesToBase64(bytes);
    } else {
        // hex
        output = [...bytes].map(b => b.toString(16).padStart(2, '0')).join('');
    }

    document.getElementById('hashOutput').value = output;
}

function swapExample(which) {
    if (which === 'caesar') {
        document.getElementById('caesarInput').value = 'HELLO WORLD';
        document.getElementById('caesarShift').value = 3;
        document.getElementById('caesarMode').value = 'encrypt';
        runCaesar();
    } else {
        document.getElementById('hashInput').value = 'hello';
        document.getElementById('hashAlgo').value = 'SHA-256';
        document.getElementById('hashFormat').value = 'hex';
        runHash();
    }
}
