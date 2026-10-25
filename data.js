/* ============================================================
   Inky's Study Den — data
   Every resource below is generated from COURSES + templates.
   To use real files: set `url` on any resource (see OVERRIDES at
   the bottom) or replace the generators with your own array.
   ============================================================ */

const COURSES = [
  { code: 'CS101', name: 'Intro to Programming',     sem: 1, dept: 'Computer Science', color: 'orange',  units: ['Variables, Types & Control Flow', 'Functions & Recursion', 'Arrays, Strings & Pointers', 'Files, Structs & Debugging'] },
  { code: 'MA101', name: 'Calculus I',               sem: 1, dept: 'Mathematics',      color: 'mustard', units: ['Limits & Continuity', 'Differentiation & Applications', 'Integration Techniques', 'Sequences & Series'] },
  { code: 'PH101', name: 'Physics for Computing',    sem: 1, dept: 'Physics',          color: 'indigo',  units: ['Waves & Oscillations', 'Quantum Basics', 'Semiconductors & Bands', 'Optics & Lasers'] },
  { code: 'CS201', name: 'Data Structures',          sem: 2, dept: 'Computer Science', color: 'orange',  units: ['Linked Lists, Stacks & Queues', 'Trees & BSTs', 'Heaps, Hashing & Tries', 'Graphs & Traversals'] },
  { code: 'MA201', name: 'Discrete Mathematics',     sem: 2, dept: 'Mathematics',      color: 'purple',  units: ['Logic & Proof Techniques', 'Sets, Relations & Functions', 'Combinatorics', 'Graph Theory & Trees'] },
  { code: 'EC201', name: 'Digital Logic Design',     sem: 3, dept: 'Electronics',      color: 'mustard', units: ['Number Systems & Boolean Algebra', 'Combinational Circuits', 'Sequential Circuits & Flip-Flops', 'Memory & Programmable Logic'] },
  { code: 'CS301', name: 'Algorithms',               sem: 3, dept: 'Computer Science', color: 'indigo',  units: ['Asymptotics & Divide and Conquer', 'Greedy Algorithms', 'Dynamic Programming', 'NP-Completeness'] },
  { code: 'CS302', name: 'Database Systems',         sem: 4, dept: 'Computer Science', color: 'purple',  units: ['ER Model & Relational Algebra', 'SQL & Normalization', 'Transactions & Concurrency', 'Indexing & Query Optimization'] },
  { code: 'CS303', name: 'Operating Systems',        sem: 4, dept: 'Computer Science', color: 'orange',  units: ['Processes & Threads', 'CPU Scheduling & Sync', 'Memory Management', 'File Systems & I/O'] },
  { code: 'CS401', name: 'Computer Networks',        sem: 5, dept: 'Computer Science', color: 'mustard', units: ['Layered Models & Physical Layer', 'Data Link & MAC', 'Network Layer & Routing', 'Transport & Application Layer'] },
  { code: 'CS402', name: 'Machine Learning',         sem: 5, dept: 'Computer Science', color: 'indigo',  units: ['Regression & Optimization', 'Classification & SVMs', 'Neural Networks', 'Clustering & Evaluation'] },
  { code: 'BM301', name: 'Principles of Management', sem: 6, dept: 'Management',       color: 'purple',  units: ['Planning & Decision Making', 'Organizing & Staffing', 'Leading & Motivation', 'Controlling & Ethics'] },
];

const SEMESTERS = [1, 2, 3, 4, 5, 6];

function hashStr(s) {
  let h = 7;
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h;
}

const NOTE_FORMATS = ['Handwritten', 'Typed', 'Slides'];
const NOTE_TAGS = [['definitions', 'diagrams'], ['formulas', 'examples'], ['revision', 'short notes'], ['derivations', 'worked problems']];

const RESOURCES = [];

COURSES.forEach((c) => {
  /* ---- Notes: one per unit ---- */
  c.units.forEach((u, i) => {
    const h = hashStr(c.code + u);
    RESOURCES.push({
      id: `n-${c.code}-${i + 1}`,
      type: 'notes',
      course: c.code,
      title: u,
      unit: i + 1,
      pages: 8 + (h % 24),
      format: NOTE_FORMATS[h % 3],
      minutes: 10 + (h % 35),
      tags: NOTE_TAGS[h % 4],
      hot: h % 5 === 0,
      added: h % 120,
      url: '#',
    });
  });

  /* ---- Past papers ---- */
  [2025, 2024, 2023, 2022].forEach((y) => {
    const h = hashStr(c.code + y + 'end');
    RESOURCES.push({
      id: `p-${c.code}-${y}-end`,
      type: 'papers',
      course: c.code,
      title: `${c.name} — End Semester ${y}`,
      year: y,
      exam: 'End Sem',
      marks: 100,
      duration: '3 hrs',
      solutions: h % 3 !== 0,
      hot: false,
      added: (2026 - y) * 120 + (h % 60),
      url: '#',
    });
  });
  [2025, 2024].forEach((y) => {
    const h = hashStr(c.code + y + 'mid');
    RESOURCES.push({
      id: `p-${c.code}-${y}-mid`,
      type: 'papers',
      course: c.code,
      title: `${c.name} — Mid Semester ${y}`,
      year: y,
      exam: 'Mid Sem',
      marks: 50,
      duration: '1.5 hrs',
      solutions: h % 2 === 0,
      hot: false,
      added: (2026 - y) * 120 + 50 + (h % 60),
      url: '#',
    });
  });

  /* ---- Study stash ---- */
  const hs = hashStr(c.code + 'stash');
  RESOURCES.push({
    id: `s-${c.code}-sheet`, type: 'stash', kind: 'sheet', course: c.code,
    title: `${c.name}: one-page cheat sheet`, meta: '1-page PDF · printable', added: hs % 90, url: '#',
  });
  RESOURCES.push({
    id: `s-${c.code}-video`, type: 'stash', kind: 'video', course: c.code,
    title: `${c.name}: lecture playlist`, meta: `${8 + (hs % 14)} videos · ${6 + (hs % 9)} hrs`, added: 10 + (hs % 90), url: '#',
  });
  RESOURCES.push({
    id: `s-${c.code}-practice`, type: 'stash', kind: 'practice', course: c.code,
    title: `${c.name}: practice problem set`, meta: `${40 + (hs % 60)} questions · with answers`, added: 20 + (hs % 90), url: '#',
  });
});

/* Course-agnostic goodies */
[
  { id: 's-ALL-pounce',  kind: 'book',  title: 'The Past-Paper Pouncing Guide',      meta: 'Short ebook · how to learn from old exams', added: 3 },
  { id: 's-ALL-week',    kind: 'sheet', title: 'Exam-week survival planner',         meta: 'Printable 7-day planner', added: 5 },
  { id: 's-ALL-cite',    kind: 'sheet', title: 'Referencing & citation cheat sheet', meta: 'APA · IEEE · Harvard', added: 12 },
  { id: 's-ALL-library', kind: 'book',  title: 'University library e-resources starter', meta: 'Journals, databases & how to log in', added: 18 },
].forEach((r) => RESOURCES.push({ type: 'stash', course: 'ALL', url: '#', ...r }));

/* ------------------------------------------------------------
   OVERRIDES — plug in real links / tweak single items here.
   e.g.  'n-CS201-2': { url: 'https://drive.google.com/…' }
   ------------------------------------------------------------ */
const OVERRIDES = {
  // 'n-CS201-2': { url: 'https://example.com/trees.pdf' },
};
RESOURCES.forEach((r) => Object.assign(r, OVERRIDES[r.id] || {}));
