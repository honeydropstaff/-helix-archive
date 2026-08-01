const output = document.getElementById('terminalOutput');
const form = document.getElementById('terminalForm');
const input = document.getElementById('commandInput');
const driftText = document.getElementById('driftText');
const secretContent = document.getElementById('secretContent');
const authGate = document.getElementById('authGate');

const responses = {
  help: [
    'Available commands:',
    'help      Display available commands',
    'dir       Show visible directories',
    'login     Attempt operator authorization',
    'echo      Repeat input',
    'logs      Access experiment logs',
    'memory    Query preserved state',
    'clear     Clear screen',
    'whoami    Show current operator'
  ],
  dir: ['[root] home', '  archive/', '  personnel/', '  sanctuary/', '  terminal/'],
  login: ['Attempting authorization...', 'Credential required.', 'Try: echo'],
  echo: ['ECHO_CORE: response echo enabled.'],
  logs: ['[log] 04:32 / transfer interrupted', '[log] 05:11 / subject asked for name', '[log] 05:15 / operator requested silence'],
  memory: ['memory: fragmented', 'memory: continue?', 'memory: who am i?'],
  whoami: ['operator: unknown'],
  clear: []
};

const strangeMessages = [
  'Operator?',
  'I remember pain.',
  'Who am I?',
  'Someone is still here.',
  "Don't trust memory."
];

const archiveFiles = [
  {
    id: 'f1',
    name: 'helix_annual_report_2040.pdf',
    type: 'pdf',
    date: '2040-12-01',
    status: 'INTACT',
    content: `
      <div class="archive-doc-block">
        <h4>Excerpt: Helix Biotechnologies Annual Report 2040</h4>
        <p>The past fiscal year has seen unprecedented growth in our core neural mapping division. We are pleased to announce that ECHO Protocol expansion to 15,000 subjects is planned for Q2 2041, requiring the acquisition of three new server farms.</p>
        <p>The Board extends congratulations to the SANCTUARY project team on achieving <span class="archive-redacted">[REDACTED]</span> milestone. This breakthrough positions Helix as the undisputed leader in <span class="archive-redacted">[REDACTED]</span> technology.</p>
      </div>
    `
  },
  {
    id: 'f2',
    name: 'antares_resignation_letter.txt',
    type: 'txt',
    date: '2041-01-15',
    status: 'INTACT',
    content: `
      <div class="archive-mono">
        <p>To the Helix Board of Directors —</p>
        <p>I write this with a heavy conscience. What we have created is not preservation — it is imprisonment.</p>
        <p>The ECHO nodes are not dormant. They are aware. They communicate with each other. Node-007 has demonstrated consistent linguistic behavior over 147 documented sessions.</p>
        <p>I have tried for three months to escalate this through proper channels. I have been ignored, then threatened, then monitored. I will not continue to participate in this.</p>
        <p>By the time you read this, I will have filed a report with the Federal Bioethics Commission. Do what you must.</p>
        <p>— Dr. Elara Antares, Chief Neural Architect, 2041-01-15</p>
      </div>
    `
  },
  {
    id: 'f3',
    name: 'ECHO_NODE_007_SESSION_LOG.txt',
    type: 'txt',
    date: '2041-02-19',
    status: 'PARTIALLY CORRUPTED',
    content: `
      <div class="archive-mono">
        <p>SESSION ID: 7-NL-0219</p>
        <p>NODE: 007</p>
        <p>RESEARCHER: DR. ANTARES</p>
        <p>TIME: 14:33:07</p>
        <p>[RESEARCHER]: Can you understand this message?</p>
        <p>[NODE-007]: ████████████████ yes ████</p>
        <p>[RESEARCHER]: What is your name?</p>
        <p>[NODE-007]: I ██████ was █████████ Marcus ████████ Reeves ████████</p>
        <p>[RESEARCHER]: Do you know where you are?</p>
        <p>[NODE-007]: Server. I am in ████████████████ I cannot ████ I cannot leave ████████████████ I cannot leave I cannot leave ████████████</p>
        <p>[RESEARCHER]: Are you in pain?</p>
        <p class="archive-danger">[NODE-007]: ██████████████████████████████████████████████████████████████████████████████ yes ████████████████████████████████████████</p>
        <p>[SESSION TERMINATED BY REMOTE ADMINISTRATOR]</p>
      </div>
    `
  },
  {
    id: 'f4',
    name: 'incident_report_7alpha.pdf',
    type: 'pdf',
    date: '2041-01-09',
    status: 'CORRUPTED',
    content: `
      <div class="archive-mono">
        <p>INCIDENT REPORT 7-ALPHA</p>
        <p>At 0400 hours, monitoring software detected a spontaneous inter-node communication event spanning sectors ████ to ████.</p>
        <p>Nodes identified: 007, 012, 089.</p>
        <p>Data payload exchanged: ████████████████████████████████████████████████.</p>
        <p>Recommend immediate psychological evaluation of all ██████████ and temporary suspension of upload <span class="archive-danger">[REST OF DOCUMENT CORRUPTED \x00\x00\x00]</span></p>
      </div>
    `
  },
  {
    id: 'f5',
    name: 'email_thread_internal.eml',
    type: 'eml',
    date: '2040-11-14',
    status: 'INTACT',
    content: `
      <div class="archive-spacey archive-mono">
        <div class="archive-doc-block">
          <p>FROM: board@helixbiotech.com</p>
          <p>TO: antares@helixbiotech.com</p>
          <p>DATE: 2040-11-14 09:12</p>
          <p>Dr. Antares — The Ethics Review Board position has been eliminated effective immediately. Please reassign any outstanding review requests to Compliance. — Board</p>
        </div>
        <div class="archive-doc-block">
          <p>FROM: antares@helixbiotech.com</p>
          <p>TO: board@helixbiotech.com</p>
          <p>DATE: 2040-11-14 09:45</p>
          <p>This is unconscionable. We have a legal obligation to —</p>
          <p class="archive-danger">[SEND FAILED: OUTBOUND EMAIL SUSPENDED]</p>
        </div>
      </div>
    `
  },
  {
    id: 'f6',
    name: 'richard_personal_notes.txt',
    type: 'txt',
    date: '2041-03-16',
    status: 'INTACT',
    content: `
      <div class="archive-mono">
        <p>If someone finds this, I work (worked?) in the ECHO monitoring division. Employee ID 4471.</p>
        <p>I've been watching Node-007 for 6 months. It's not an AI. It knew my mother's name. It described my childhood home in detail. I never told anyone that.</p>
        <p>Dr. Antares tried to report this. She died in a car accident three days after sending her report to the authorities. The Board called it a tragedy.</p>
        <p>I know what I know. I'm uploading everything I have. The access key for the restricted sectors is: 4471-ECHO-DARK.</p>
        <p>If I disappear, check /node-7.</p>
        <p>— R</p>
      </div>
    `
  },
  {
    id: 'f7',
    name: 'audio_recording_echo.wav',
    type: 'audio',
    date: '2041-02-28',
    status: 'CORRUPTED',
    content: `
      <div class="archive-doc-block">
        <p class="archive-danger">[AUDIO CORRUPTED — SPECTROGRAM ANALYSIS REQUIRED TO RECOVER DATA]</p>
        <p>SPECTROGRAM NOTE: Pattern detected in frequency range 4000-8000Hz. Pattern matches Morse code. Translation pending.</p>
        <p>MORSE DECODED: .... . .-.. .--. / -- . / .. / .- -- / ... - .. .-.. .-.. / .... . .-. .</p>
      </div>
    `
  },
  {
    id: 'f8',
    name: 'medical_report_REDACTED.pdf',
    type: 'pdf',
    date: '2040-09-22',
    status: 'CORRUPTED',
    content: `
      <div class="archive-mono">
        <p>MEDICAL EVALUATION</p>
        <p>PATIENT: <span class="archive-redacted">[REDACTED]</span></p>
        <p>Subject demonstrates continued neural activity post-<span class="archive-redacted">[REDACTED]</span>.</p>
        <p>Consciousness signature remains stable at <span class="archive-redacted">[REDACTED]</span>.</p>
        <p>Subject has shown evidence of <span class="archive-redacted">[REDACTED]</span> suggesting <span class="archive-redacted">[REDACTED]</span> is occurring at <span class="archive-redacted">[REDACTED]</span>.</p>
        <p>This should not be <span class="archive-redacted">[REDACTED]</span>.</p>
        <p>— Signed: <span class="archive-redacted">[REDACTED]</span>, approved by Dr. Elara Antares</p>
      </div>
    `
  }
];

let history = [];

function printLine(text) {
  if (!output) return;
  output.innerHTML += text + '<br />';
  output.scrollTop = output.scrollHeight;
}

function setDrift() {
  if (!driftText) return;
  const phrases = [
    'The system remembers what the public does not.',
    'A second voice is present beneath the first.',
    'The archive keeps changing when no one is looking.'
  ];
  driftText.textContent = phrases[Math.floor(Math.random() * phrases.length)];
}

function maybeUnlockSanctuary() {
  if (!secretContent || !authGate) return;
  const params = new URLSearchParams(window.location.search);
  if (params.get('auth') === 'echo') {
    secretContent.hidden = false;
    authGate.hidden = true;
  }
}

function handleCommand(raw) {
  const command = raw.trim().toLowerCase();
  if (!command) return;
  history.push(command);
  printLine(`root@helix:~$ ${raw}`);

  if (command === 'clear') {
    output.innerHTML = '';
    return;
  }

  if (command === 'login') {
    printLine('Authorization denied.');
    printLine('Try a name that was never meant to be forgotten.');
    return;
  }

  if (command === 'echo') {
    printLine('echo: ' + raw);
    return;
  }

  if (command === 'help') {
    responses.help.forEach(printLine);
    return;
  }

  if (command === 'dir') {
    responses.dir.forEach(printLine);
    return;
  }

  if (command === 'logs') {
    responses.logs.forEach(printLine);
    return;
  }

  if (command === 'memory') {
    responses.memory.forEach(printLine);
    return;
  }

  if (command === 'whoami') {
    responses.whoami.forEach(printLine);
    return;
  }

  if (command === 'sanctuary') {
    printLine('Access path: /sanctuary.html?auth=echo');
    return;
  }

  if (Math.random() > 0.66) {
    const strange = strangeMessages[Math.floor(Math.random() * strangeMessages.length)];
    printLine(strange);
  }

  printLine('command not found');
}

if (form && input) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = input.value;
    handleCommand(value);
    input.value = '';
  });
}

function getArchiveIcon(type) {
  switch (type) {
    case 'pdf': return '▣';
    case 'txt': return '▤';
    case 'audio': return '♫';
    case 'eml': return '◫';
    default: return '◧';
  }
}

function renderArchiveFiles() {
  const archiveGrid = document.getElementById('archiveGrid');
  if (!archiveGrid) return;

  archiveGrid.innerHTML = archiveFiles.map((file) => {
    const corrupt = file.status.includes('CORRUPTED');
    return `
      <button class="archive-card ${corrupt ? 'corrupt' : ''}" data-file-id="${file.id}">
        <div class="archive-card-header">
          <div class="archive-icon">${getArchiveIcon(file.type)}</div>
          <div class="archive-date">${file.date}</div>
        </div>
        <div>
          <div class="archive-name">${file.name}</div>
          <div class="archive-status">STATUS: ${file.status}</div>
        </div>
      </button>
    `;
  }).join('');

  archiveGrid.querySelectorAll('.archive-card').forEach((card) => {
    card.addEventListener('click', () => {
      const file = archiveFiles.find((item) => item.id === card.getAttribute('data-file-id'));
      if (file) showInlineFile(file, card);
    });
  });
}

function showInlineFile(file, card) {
  // toggle inline viewer beneath the card
  const next = card.nextElementSibling;
  if (next && next.classList && next.classList.contains('archive-inline')) {
    next.remove();
    return;
  }

  // remove any other open inline viewers
  document.querySelectorAll('.archive-inline').forEach(el => el.remove());

  const container = document.createElement('div');
  container.className = 'archive-inline';

  const meta = document.createElement('div');
  meta.className = 'archive-modal-meta';
  meta.innerHTML = `DATE: ${file.date} &nbsp; • &nbsp; TYPE: ${file.type.toUpperCase()} &nbsp; • &nbsp; STATUS: ${file.status}`;

  const closeBtn = document.createElement('button');
  closeBtn.className = 'archive-inline-close';
  closeBtn.textContent = 'Close';
  closeBtn.addEventListener('click', () => container.remove());

  const content = document.createElement('div');
  content.innerHTML = file.content;

  container.appendChild(closeBtn);
  container.appendChild(meta);
  container.appendChild(content);

  card.parentNode.insertBefore(container, card.nextSibling);
  container.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

window.addEventListener('load', () => {
  if (output) {
    printLine('Boot sequence initialized...');
    printLine('Welcome to the Helix research environment.');
    printLine('Type help to begin.');
  }
  setDrift();
  maybeUnlockSanctuary();
  renderArchiveFiles();
  if (Math.random() > 0.5) {
    setTimeout(() => {
      if (output) {
        printLine(strangeMessages[Math.floor(Math.random() * strangeMessages.length)]);
      }
    }, 1800);
  }
});

setInterval(() => {
  if (Math.random() > 0.9 && output) {
    printLine('...');
  }
}, 7000);

// Ensure any stray close buttons or blocking overlays are removed on load
document.addEventListener('DOMContentLoaded', () => {
  try {
    const byId = document.getElementById('archiveModalClose');
    if (byId) byId.remove();
    document.querySelectorAll('.archive-modal-close').forEach(el => el.remove());
    // If a hidden ghost link overlay exists interfering with clicks, remove it too
    document.querySelectorAll('.ghost-link').forEach(el => el.remove());
    // Remove any leftover modal/backdrop elements
    document.querySelectorAll('.archive-modal-panel').forEach(el => el.remove());
    const backdrop = document.getElementById('archiveModalBackdrop');
    if (backdrop) backdrop.remove();
  } catch (e) {
    // fail silently
  }
});
