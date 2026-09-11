(function () {
  'use strict';

  const STORAGE_KEY = 'tt-workbench.plans';
  const LIST_STORAGE_KEY = 'tt-workbench.lists';
  const PROJECT_STORAGE_KEY = 'tt-workbench.projects';
  const MEMO_STORAGE_KEY = 'tt-workbench.memos';
  const MEMO_CATEGORIES_KEY = 'tt-workbench.memoCategories';
  const MEMO_ACTIVE_CATEGORY_KEY = 'tt-workbench.memoActiveCategory';
  const DREAM_STORAGE_KEY = 'tt-workbench.dreams';
  const ME_STORAGE_KEY = 'tt-workbench.me';
  const SIGNATURE_KEY = 'tt-workbench.signature';
  const CHECK_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';

  // 元素引用
  const planList = document.getElementById('plan-list');
  const emptyEl = document.getElementById('plan-empty');
  const todayDateEl = document.getElementById('today-date');
  const todaySignature = document.getElementById('today-signature');
  const addBtn = document.getElementById('btn-add');
  const segButtons = Array.from(document.querySelectorAll('.seg-btn'));
  const todayView = document.getElementById('today-view');
  const diaryView = document.getElementById('diary-view');
  const calendarWrap = document.getElementById('calendar');
  const diaryDateLabel = document.getElementById('diary-date-label');
  const diaryPlanList = document.getElementById('diary-plan-list');
  const diaryPlanEmpty = document.getElementById('diary-plan-empty');

  const editorOverlay = document.getElementById('editor-overlay');
  const editorTitle = document.getElementById('editor-title');
  const editorDesc = document.getElementById('editor-desc');
  const editorSubs = document.getElementById('editor-subs');
  const editorCancel = document.getElementById('editor-cancel');
  const editorDone = document.getElementById('editor-done');

  // ALL LIST 模块
  const listCollection = document.getElementById('list-collection');
  const listEmpty = document.getElementById('list-empty');
  const listAddBtn = document.getElementById('btn-add-list');
  const listEditorOverlay = document.getElementById('list-editor-overlay');
  const listEditorCancel = document.getElementById('list-editor-cancel');
  const listEditorSave = document.getElementById('list-editor-save');
  const listNameInput = document.getElementById('list-name-input');
  const listTypeOptions = Array.from(document.querySelectorAll('#list-type-selector .type-option'));

  const kindOptions = Array.from(document.querySelectorAll('#kind-selector .kind-option'));
  const listFields = document.getElementById('list-fields');
  const progressFields = document.getElementById('progress-fields');
  const progressNameInput = document.getElementById('progress-name-input');
  const progressTypeOptions = Array.from(document.querySelectorAll('#progress-type-selector .type-option'));
  const numberProgressFields = document.getElementById('number-progress-fields');
  const eventProgressFields = document.getElementById('event-progress-fields');
  const eventTaskList = document.getElementById('event-task-list');
  const npStart = document.getElementById('np-start');
  const npUnit = document.getElementById('np-unit');
  const npTarget = document.getElementById('np-target');
  const npTargetUnit = document.getElementById('np-target-unit');
  const npDateToggle = document.getElementById('np-date-toggle');
  const npDate = document.getElementById('np-date');
  const epDateToggle = document.getElementById('ep-date-toggle');
  const epDate = document.getElementById('ep-date');
  const addEventTaskBtn = document.getElementById('add-event-task');

  const progressDetail = document.getElementById('progress-detail');
  const progressBack = document.getElementById('progress-back');
  const progressDetailContent = document.getElementById('progress-detail-content');
  const progressDiaryFab = document.getElementById('progress-diary-fab');
  const btnDiaryOpen = document.getElementById('btn-diary-open');
  const projectDiary = document.getElementById('project-diary');
  const diaryBack = document.getElementById('diary-back');
  const diaryTitle = document.getElementById('diary-title');
  const diaryPage = document.getElementById('diary-page');
  const diaryPrev = document.getElementById('diary-prev');
  const diaryNext = document.getElementById('diary-next');
  const diaryIndicator = document.getElementById('diary-indicator');
  const btnDiaryWrite = document.getElementById('btn-diary-write');
  const diaryNoteOverlay = document.getElementById('diary-note-overlay');
  const diaryNoteCancel = document.getElementById('diary-note-cancel');
  const diaryNoteSave = document.getElementById('diary-note-save');
  const diaryNoteDate = document.getElementById('diary-note-date');
  const diaryNoteTypeOptions = Array.from(document.querySelectorAll('#diary-note-type-selector .type-option'));
  const diaryNoteText = document.getElementById('diary-note-text');

  const listDetail = document.getElementById('list-detail');
  const detailBack = document.getElementById('detail-back');
  const detailName = document.getElementById('detail-name');
  const detailType = document.getElementById('detail-type');
  const detailItems = document.getElementById('detail-items');
  const detailEmpty = document.getElementById('detail-empty');
  const itemAddBtn = document.getElementById('btn-add-item');
  const itemEditorOverlay = document.getElementById('item-editor-overlay');
  const itemEditorCancel = document.getElementById('item-editor-cancel');
  const itemEditorDone = document.getElementById('item-editor-done');
  const itemEditorTitle = document.getElementById('item-editor-title');
  const itemEditorDesc = document.getElementById('item-editor-desc');
  const itemEditorSubs = document.getElementById('item-editor-subs');

  const memoList = document.getElementById('memo-list');
  const memoEmpty = document.getElementById('memo-empty');
  const memoAddBtn = document.getElementById('btn-add-memo');
  const memoCategoryBtn = document.getElementById('memo-category-btn');
  const memoCategoryLabel = document.getElementById('memo-category-label');
  const memoCategoryMenu = document.getElementById('memo-category-menu');

  const dreamList = document.getElementById('dream-list');
  const dreamEmpty = document.getElementById('dream-empty');
  const dreamAddBtn = document.getElementById('btn-add-dream');
  const dreamEditorOverlay = document.getElementById('dream-editor-overlay');
  const dreamEditorCancel = document.getElementById('dream-editor-cancel');
  const dreamEditorSave = document.getElementById('dream-editor-save');
  const dreamKindOptions = Array.from(document.querySelectorAll('#dream-kind-selector .kind-option'));
  const dreamTextFields = document.getElementById('dream-text-fields');
  const dreamPhotoFields = document.getElementById('dream-photo-fields');
  const dreamTextTitle = document.getElementById('dream-text-title');
  const dreamTextBody = document.getElementById('dream-text-body');
  const dreamPhotoTop = document.getElementById('dream-photo-top');
  const dreamPhotoBottom = document.getElementById('dream-photo-bottom');
  const dreamPhotoFile = document.getElementById('dream-photo-file');
  const dreamPhotoSelect = document.getElementById('dream-photo-select');
  const dreamPhotoPreview = document.getElementById('dream-photo-preview');
  const btnDreamMusic = document.getElementById('btn-dream-music');
  const musicBar = document.getElementById('music-bar');
  const musicName = document.getElementById('music-name');
  const musicPrev = document.getElementById('music-prev');
  const musicPlay = document.getElementById('music-play');
  const musicNext = document.getElementById('music-next');
  const musicMode = document.getElementById('music-mode');
  const musicListBtn = document.getElementById('music-list-btn');
  const musicListPanel = document.getElementById('music-list-panel');
  const musicListEl = document.getElementById('music-list');
  const musicFileInput = document.getElementById('music-file-input');
  const meAvatar = document.getElementById('me-avatar');
  const meAvatarImg = document.getElementById('me-avatar-img');
  const meAvatarPlaceholder = document.getElementById('me-avatar-placeholder');
  const meId = document.getElementById('me-id');
  const meSignature = document.getElementById('me-signature');
  const meAvatarFile = document.getElementById('me-avatar-file');
  const memoEditorOverlay = document.getElementById('memo-editor-overlay');
  const memoEditorBack = document.getElementById('memo-editor-back');
  const memoEditorDone = document.getElementById('memo-editor-done');
  const memoEditorDate = document.getElementById('memo-editor-date');
  const memoEditorTitle = document.getElementById('memo-editor-title');
  const memoEditorBody = document.getElementById('memo-editor-body');

  const tabs = Array.from(document.querySelectorAll('.tab'));
  const pages = Array.from(document.querySelectorAll('.page'));

  let plans = load();
  let lists = loadLists();
  let memos = loadMemos();
  let memoCategories = loadMemoCategories();
  let activeCategory = loadActiveCategory();
  let dreams = loadDreams();
  let currentDreamKind = 'text';
  let currentDreamMedia = null;
  let currentDreamMediaType = null;
  let profile = loadProfile();
  let musicList = [];
  let currentMusicIndex = -1;
  let isMusicPlaying = false;
  let playMode = 'list';
  let musicAudio = null;
  let clickAudioCtx = null;
  let musicExited = false;
  let musicCounter = 0;
  let currentPage = 'today';
  let currentListType = 'todo';
  let projects = loadProjects();
  let currentKind = 'list';
  let currentPType = 'number';
  let npDateEnabled = false;
  let epDateEnabled = false;
  let currentProgressId = null;
  let diaryPageIndex = 0;
  let diaryDays = [];
  let diaryNoteType = '复盘';
  let currentMemoId = null;
  let currentSeg = 'today';
  let selectedDate = new Date();
  let currentPlanDate = todayStr();

  // ---- 工具 ----
  function uid() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10);
  }

  function todayStr() {
    return dateStr(new Date());
  }

  function dateStr(d) {
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return d.getFullYear() + '-' + mm + '-' + dd;
  }

  function load() {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      return Array.isArray(data) ? data : [];
    } catch (e) {
      return [];
    }
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
    } catch (e) {
      // 存储不可用或已满时静默失败
    }
  }

  // ---- 实时日期 ----
  function updateDate() {
    const now = new Date();
    todayDateEl.textContent = now.getMonth() + 1 + '月' + now.getDate() + '日';
  }

  // ---- 渲染今日列表 ----
  function closeOthers(exceptWrap) {
    document.querySelectorAll('.swipe-item.open').forEach((w) => {
      if (w === exceptWrap) return;
      const c = w.querySelector('.swipe-content');
      if (c) c.style.transform = '';
      w.classList.remove('open');
    });
  }

  function enableSwipe(wrap, content) {
    const actions = wrap.querySelector('.swipe-actions');
    let width = 0;
    let startX = 0;
    let startY = 0;
    let baseX = 0;
    let currentX = 0;
    let dragging = false;
    let horizontal = false;
    let moved = false;

    const apply = (x) => {
      content.style.transform = x === 0 ? '' : 'translateX(' + x + 'px)';
    };
    const close = () => {
      baseX = 0;
      currentX = 0;
      apply(0);
      wrap.classList.remove('open');
    };
    const open = () => {
      baseX = -width;
      currentX = -width;
      apply(-width);
      wrap.classList.add('open');
    };

    content.addEventListener('pointerdown', (e) => {
      width = actions.offsetWidth;
      startX = e.clientX;
      startY = e.clientY;
      baseX = wrap.classList.contains('open') ? -width : 0;
      currentX = baseX;
      dragging = true;
      horizontal = false;
      moved = false;
      content.style.transition = 'none';
      closeOthers(wrap);
    });

    content.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      if (!horizontal) {
        if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
        if (Math.abs(dy) > Math.abs(dx)) {
          dragging = false;
          content.style.transition = '';
          return;
        }
        horizontal = true;
      }
      moved = true;
      currentX = Math.max(-width, Math.min(0, baseX + dx));
      apply(currentX);
    });

    const end = () => {
      if (!dragging) return;
      dragging = false;
      content.style.transition = '';
      if (currentX < -width / 2) open();
      else close();
    };

    content.addEventListener('pointerup', end);
    content.addEventListener('pointercancel', end);

    content.addEventListener(
      'click',
      (e) => {
        if (moved) {
          e.preventDefault();
          e.stopPropagation();
          moved = false;
        }
      },
      true
    );
  }

  function buildTaskItem(item, handlers) {
    const li = document.createElement('li');
    li.className = 'swipe-item';

    const actions = document.createElement('div');
    actions.className = 'swipe-actions';

    const pinBtn = document.createElement('button');
    pinBtn.type = 'button';
    pinBtn.className = 'swipe-btn swipe-pin';
    pinBtn.textContent = '置顶';
    pinBtn.addEventListener('click', handlers.onPin);

    const delBtn = document.createElement('button');
    delBtn.type = 'button';
    delBtn.className = 'swipe-btn swipe-delete';
    delBtn.textContent = '删除';
    delBtn.addEventListener('click', handlers.onDelete);

    actions.appendChild(pinBtn);
    actions.appendChild(delBtn);

    const content = document.createElement('div');
    content.className = 'swipe-content plan-item' + (item.done ? ' done' : '');

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'plan-toggle';
    toggle.setAttribute('role', 'checkbox');
    toggle.setAttribute('aria-checked', String(item.done));
    toggle.setAttribute('aria-label', item.done ? '标记为未完成' : '标记为已完成');
    toggle.innerHTML = CHECK_SVG;
    toggle.addEventListener('click', handlers.onToggle);

    const body = document.createElement('div');
    body.className = 'plan-body';

    const title = document.createElement('div');
    title.className = 'plan-title';
    title.textContent = item.title;
    body.appendChild(title);

    if (item.desc) {
      const desc = document.createElement('div');
      desc.className = 'plan-desc';
      desc.textContent = item.desc;
      body.appendChild(desc);
    }

    if (item.subs && item.subs.length) {
      const subs = document.createElement('ul');
      subs.className = 'plan-subs';
      item.subs.forEach((s) => {
        const subItem = document.createElement('li');
        subItem.className = 'sub-item' + (s.done ? ' checked' : '');

        const check = document.createElement('button');
        check.type = 'button';
        check.className = 'sub-check' + (s.done ? ' checked' : '');
        check.setAttribute('aria-label', '勾选子项');
        check.innerHTML = CHECK_SVG;
        check.addEventListener('click', () => handlers.onToggleSub(s));

        const text = document.createElement('span');
        text.className = 'sub-text';
        text.textContent = s.text;

        subItem.appendChild(check);
        subItem.appendChild(text);
        subs.appendChild(subItem);
      });
      body.appendChild(subs);
    }

    content.appendChild(toggle);
    content.appendChild(body);

    li.appendChild(actions);
    li.appendChild(content);

    enableSwipe(li, content);

    return li;
  }

  function createPlanItem(plan) {
    return buildTaskItem(plan, {
      onToggle: () => {
        plan.done = !plan.done;
        save();
        rerenderTodayModule();
      },
      onToggleSub: (s) => {
        s.done = !s.done;
        save();
        rerenderTodayModule();
      },
      onDelete: () => {
        plans = plans.filter((p) => p.id !== plan.id);
        save();
        rerenderTodayModule();
      },
      onPin: () => {
        const idx = plans.indexOf(plan);
        if (idx > 0) {
          plans.splice(idx, 1);
          plans.unshift(plan);
          save();
          rerenderTodayModule();
        }
      },
    });
  }

  function renderToday() {
    updateDate();
    planList.innerHTML = '';

    const todayPlans = plans.filter((p) => p.date === todayStr());
    if (todayPlans.length === 0) {
      emptyEl.hidden = false;
      return;
    }
    emptyEl.hidden = true;
    todayPlans.forEach((p) => planList.appendChild(createPlanItem(p)));
  }

  function renderCalendar() {
    calendarWrap.innerHTML = '';
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();

    const header = document.createElement('div');
    header.className = 'calendar-header';

    const prevBtn = document.createElement('button');
    prevBtn.type = 'button';
    prevBtn.className = 'cal-nav';
    prevBtn.setAttribute('aria-label', '上个月');
    prevBtn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>';
    prevBtn.addEventListener('click', () => navMonth(-1));

    const title = document.createElement('div');
    title.className = 'calendar-title';
    title.textContent = year + '年' + (month + 1) + '月';

    const nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.className = 'cal-nav';
    nextBtn.setAttribute('aria-label', '下个月');
    nextBtn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>';
    nextBtn.addEventListener('click', () => navMonth(1));

    header.appendChild(prevBtn);
    header.appendChild(title);
    header.appendChild(nextBtn);
    calendarWrap.appendChild(header);

    const weekdays = document.createElement('div');
    weekdays.className = 'calendar-weekdays';
    ['日', '一', '二', '三', '四', '五', '六'].forEach((w) => {
      const s = document.createElement('span');
      s.textContent = w;
      weekdays.appendChild(s);
    });
    calendarWrap.appendChild(weekdays);

    const grid = document.createElement('div');
    grid.className = 'calendar-grid';

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
      const blank = document.createElement('div');
      blank.className = 'cal-day cal-blank';
      grid.appendChild(blank);
    }

    const todayS = todayStr();
    const selS = dateStr(selectedDate);

    for (let d = 1; d <= daysInMonth; d++) {
      const cell = document.createElement('button');
      cell.type = 'button';
      cell.className = 'cal-day';
      cell.textContent = d;

      const ds = year + '-' + String(month + 1).padStart(2, '0') + '-' + String(d).padStart(2, '0');
      if (plans.some((p) => p.date === ds)) cell.classList.add('has-plan');
      if (ds === todayS) cell.classList.add('today');
      if (ds === selS) cell.classList.add('selected');

      cell.addEventListener('click', () => {
        selectedDate = new Date(year, month, d);
        renderCalendar();
        renderDiaryPlans();
      });

      grid.appendChild(cell);
    }

    calendarWrap.appendChild(grid);
  }

  function renderDiaryPlans() {
    diaryDateLabel.textContent = (selectedDate.getMonth() + 1) + '月' + selectedDate.getDate() + '日';
    const selS = dateStr(selectedDate);
    const list = plans.filter((p) => p.date === selS);
    diaryPlanList.innerHTML = '';
    if (list.length === 0) {
      diaryPlanEmpty.hidden = false;
      return;
    }
    diaryPlanEmpty.hidden = true;
    list.forEach((p) => diaryPlanList.appendChild(createPlanItem(p)));
  }

  function navMonth(delta) {
    const y = selectedDate.getFullYear();
    const m = selectedDate.getMonth();
    const d = selectedDate.getDate();
    const base = new Date(y, m + delta, 1);
    const lastDay = new Date(base.getFullYear(), base.getMonth() + 1, 0).getDate();
    selectedDate = new Date(base.getFullYear(), base.getMonth(), Math.min(d, lastDay));
    renderCalendar();
    renderDiaryPlans();
  }

  function rerenderTodayModule() {
    renderToday();
    renderCalendar();
    renderDiaryPlans();
  }

  // ---- 编辑器 ----
  function openEditor() {
    editorTitle.value = '';
    editorDesc.value = '';
    editorSubs.innerHTML = '';
    addSubRow(editorSubs, false, null);
    editorOverlay.hidden = false;
    requestAnimationFrame(() => editorTitle.focus());
  }

  function closeEditor() {
    editorOverlay.hidden = true;
    addBtn.focus();
  }

  function createSubRow(container, sub) {
    const row = document.createElement('div');
    row.className = 'sub-row';

    const check = document.createElement('button');
    check.type = 'button';
    check.className = 'sub-check' + (sub && sub.done ? ' checked' : '');
    check.setAttribute('aria-label', '勾选子项');
    check.innerHTML = CHECK_SVG;
    check.addEventListener('click', () => check.classList.toggle('checked'));

    const inp = document.createElement('input');
    inp.type = 'text';
    inp.className = 'sub-input';
    inp.placeholder = '添加子项…';
    inp.autocomplete = 'off';
    if (sub) inp.value = sub.text;
    setupSubInput(container, inp);

    row.appendChild(check);
    row.appendChild(inp);
    return row;
  }

  function addSubRow(container, focus, sub) {
    const row = createSubRow(container, sub);
    container.appendChild(row);
    if (focus) row.querySelector('.sub-input').focus();
  }

  function setupSubInput(container, inp) {
    inp.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const row = inp.closest('.sub-row');
        const rows = Array.from(container.querySelectorAll('.sub-row'));
        const idx = rows.indexOf(row);
        if (idx === rows.length - 1) {
          if (inp.value.trim() !== '') addSubRow(container, true);
        } else {
          rows[idx + 1].querySelector('.sub-input').focus();
        }
      } else if (e.key === 'Backspace' && inp.value === '') {
        const rows = Array.from(container.querySelectorAll('.sub-row'));
        if (rows.length > 1) {
          const row = inp.closest('.sub-row');
          const idx = rows.indexOf(row);
          row.remove();
          const prev = container.querySelectorAll('.sub-row')[idx - 1];
          if (prev) prev.querySelector('.sub-input').focus();
        }
      }
    });
  }

  function collectSubs(container) {
    return Array.from(container.querySelectorAll('.sub-row'))
      .map((row) => ({
        id: uid(),
        text: row.querySelector('.sub-input').value.trim(),
        done: row.querySelector('.sub-check').classList.contains('checked'),
      }))
      .filter((s) => s.text !== '');
  }

  function collectAndSave() {
    const title = editorTitle.value.trim();
    if (!title) {
      editorTitle.focus();
      return;
    }

    const desc = editorDesc.value.trim();
    const subs = collectSubs(editorSubs);

    plans.unshift({
      id: uid(),
      title: title,
      desc: desc,
      subs: subs,
      done: false,
      date: currentPlanDate,
      createdAt: Date.now(),
    });
    save();
    rerenderTodayModule();
    closeEditor();
  }

  // ---- ALL LIST 模块 ----
  const LIST_TYPES = {
    todo: {
      label: '代办清单',
      icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 12l2 2 4-4"/></svg>',
    },
    wish: {
      label: '愿望清单',
      icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    },
  };

  function loadLists() {
    try {
      const data = JSON.parse(localStorage.getItem(LIST_STORAGE_KEY) || '[]');
      return Array.isArray(data) ? data : [];
    } catch (e) {
      return [];
    }
  }

  function saveLists() {
    try {
      localStorage.setItem(LIST_STORAGE_KEY, JSON.stringify(lists));
    } catch (e) {}
  }

  function loadProjects() {
    try {
      const data = JSON.parse(localStorage.getItem(PROJECT_STORAGE_KEY) || '[]');
      return Array.isArray(data) ? data : [];
    } catch (e) {
      return [];
    }
  }

  function saveProjects() {
    try {
      localStorage.setItem(PROJECT_STORAGE_KEY, JSON.stringify(projects));
    } catch (e) {}
  }

  function renderLists() {
    listCollection.innerHTML = '';
    const all = [];
    lists.forEach((l) => all.push({ kind: 'list', data: l, createdAt: l.createdAt }));
    projects.forEach((p) => all.push({ kind: 'project', data: p, createdAt: p.createdAt }));
    all.sort((a, b) => b.createdAt - a.createdAt);

    if (all.length === 0) {
      listEmpty.hidden = false;
      return;
    }
    listEmpty.hidden = true;
    all.forEach((it) => {
      listCollection.appendChild(it.kind === 'list' ? createListItem(it.data) : createProjectItem(it.data));
    });
  }

  function createListItem(list) {
    const li = document.createElement('li');
    li.className = 'swipe-item';

    const actions = document.createElement('div');
    actions.className = 'swipe-actions';

    const pinBtn = document.createElement('button');
    pinBtn.type = 'button';
    pinBtn.className = 'swipe-btn swipe-pin';
    pinBtn.textContent = '置顶';
    pinBtn.addEventListener('click', () => {
      const idx = lists.indexOf(list);
      if (idx > 0) {
        lists.splice(idx, 1);
        lists.unshift(list);
        saveLists();
        renderLists();
      }
    });

    const delBtn = document.createElement('button');
    delBtn.type = 'button';
    delBtn.className = 'swipe-btn swipe-delete';
    delBtn.textContent = '删除';
    delBtn.addEventListener('click', () => {
      lists = lists.filter((x) => x.id !== list.id);
      saveLists();
      renderLists();
    });

    actions.appendChild(pinBtn);
    actions.appendChild(delBtn);

    const content = document.createElement('div');
    content.className = 'swipe-content list-item';

    const icon = document.createElement('span');
    icon.className = 'list-type-icon icon-' + list.type;
    icon.innerHTML = LIST_TYPES[list.type].icon;

    const info = document.createElement('div');
    info.className = 'list-info';

    const name = document.createElement('span');
    name.className = 'list-name';
    name.textContent = list.name;

    const count = (list.items || []).length;
    const tag = document.createElement('span');
    tag.className = 'list-type-tag';
    tag.textContent = LIST_TYPES[list.type].label + (count > 0 ? ' · ' + count + ' 项' : '');

    info.appendChild(name);
    info.appendChild(tag);

    content.appendChild(icon);
    content.appendChild(info);
    content.addEventListener('click', () => openListDetail(list.id));

    li.appendChild(actions);
    li.appendChild(content);

    enableSwipe(li, content);

    return li;
  }

  function numericCurrent(p) {
    return (p.start || 0) + (p.additions || []).reduce((s, a) => s + (a.num || 0), 0);
  }

  function projectPercent(p) {
    if (p.ptype === 'number') {
      const total = (p.target || 0) - (p.start || 0);
      if (total <= 0) return 0;
      const cur = numericCurrent(p);
      return Math.max(0, Math.min(100, ((cur - (p.start || 0)) / total) * 100));
    }
    const tasks = p.tasks || [];
    if (tasks.length === 0) return 0;
    const done = tasks.filter((t) => t.done).length;
    return Math.round((done / tasks.length) * 100);
  }

  function formatDateTime(ts) {
    const d = new Date(ts);
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const hh = String(d.getHours()).padStart(2, '0');
    const mi = String(d.getMinutes()).padStart(2, '0');
    return mm + '月' + dd + '日 ' + hh + ':' + mi;
  }

  function createProjectItem(project) {
    const li = document.createElement('li');
    li.className = 'swipe-item';

    const actions = document.createElement('div');
    actions.className = 'swipe-actions';

    const pinBtn = document.createElement('button');
    pinBtn.type = 'button';
    pinBtn.className = 'swipe-btn swipe-pin';
    pinBtn.textContent = '置顶';
    pinBtn.addEventListener('click', () => {
      const idx = projects.indexOf(project);
      if (idx > 0) {
        projects.splice(idx, 1);
        projects.unshift(project);
        saveProjects();
        renderLists();
      }
    });

    const delBtn = document.createElement('button');
    delBtn.type = 'button';
    delBtn.className = 'swipe-btn swipe-delete';
    delBtn.textContent = '删除';
    delBtn.addEventListener('click', () => {
      projects = projects.filter((x) => x.id !== project.id);
      saveProjects();
      renderLists();
    });

    actions.appendChild(pinBtn);
    actions.appendChild(delBtn);

    const content = document.createElement('div');
    content.className = 'swipe-content proj-card proj-' + project.ptype;

    const name = document.createElement('div');
    name.className = 'proj-name';
    name.textContent = project.name;

    const pct = projectPercent(project);
    const barRow = document.createElement('div');
    barRow.className = 'proj-bar-row';
    const bar = document.createElement('div');
    bar.className = 'progress-bar';
    const fill = document.createElement('div');
    fill.className = 'progress-fill';
    fill.style.width = pct + '%';
    bar.appendChild(fill);
    const pctEl = document.createElement('span');
    pctEl.className = 'proj-percent';
    pctEl.textContent = Math.round(pct) + '%';
    barRow.appendChild(bar);
    barRow.appendChild(pctEl);

    content.appendChild(name);
    content.appendChild(barRow);
    content.addEventListener('click', () => openProgressDetail(project.id));

    li.appendChild(actions);
    li.appendChild(content);
    enableSwipe(li, content);

    return li;
  }

  function openListEditor() {
    currentKind = 'list';
    currentListType = 'todo';
    currentPType = 'number';
    npDateEnabled = false;
    epDateEnabled = false;

    listNameInput.value = '';
    progressNameInput.value = '';
    npStart.value = '';
    npUnit.value = '';
    npTarget.value = '';
    npTargetUnit.value = '';
    npDate.value = '';
    epDate.value = '';
    eventTaskList.innerHTML = '';

    kindOptions.forEach((k) => k.classList.toggle('active', k.dataset.kind === 'list'));
    listTypeOptions.forEach((o) => o.classList.toggle('active', o.dataset.type === 'todo'));
    progressTypeOptions.forEach((o) => o.classList.toggle('active', o.dataset.ptype === 'number'));
    npDateToggle.classList.remove('on');
    epDateToggle.classList.remove('on');
    npDateToggle.setAttribute('aria-pressed', 'false');
    epDateToggle.setAttribute('aria-pressed', 'false');
    npDate.hidden = true;
    epDate.hidden = true;

    listFields.hidden = false;
    progressFields.hidden = true;
    numberProgressFields.hidden = false;
    eventProgressFields.hidden = true;

    addSubRow(eventTaskList, false, null);

    listEditorOverlay.hidden = false;
    requestAnimationFrame(() => listNameInput.focus());
  }

  function closeListEditor() {
    listEditorOverlay.hidden = true;
    listAddBtn.focus();
  }

  function collectTaskTexts(container) {
    return Array.from(container.querySelectorAll('.sub-row'))
      .map((row) => row.querySelector('.sub-input').value.trim())
      .filter((t) => t !== '')
      .map((text) => ({ id: uid(), text: text, done: false, note: '', doneAt: null }));
  }

  function collectAndSaveList() {
    if (currentKind === 'list') {
      const name = listNameInput.value.trim();
      if (!name) {
        listNameInput.focus();
        return;
      }
      const list = {
        id: uid(),
        name: name,
        type: currentListType,
        items: [],
        createdAt: Date.now(),
      };
      lists.unshift(list);
      saveLists();
      renderLists();
      closeListEditor();
      openListDetail(list.id);
      return;
    }

    const name = progressNameInput.value.trim();
    if (!name) {
      progressNameInput.focus();
      return;
    }

    if (currentPType === 'number') {
      const start = parseFloat(npStart.value) || 0;
      const target = parseFloat(npTarget.value);
      if (isNaN(target)) {
        npTarget.focus();
        return;
      }
      const project = {
        id: uid(),
        name: name,
        ptype: 'number',
        start: start,
        unit: npUnit.value.trim(),
        target: target,
        targetUnit: npTargetUnit.value.trim(),
        targetDate: npDateEnabled ? npDate.value : null,
        additions: [],
        createdAt: Date.now(),
      };
      projects.unshift(project);
      saveProjects();
      renderLists();
      closeListEditor();
      openProgressDetail(project.id);
    } else {
      const project = {
        id: uid(),
        name: name,
        ptype: 'event',
        tasks: collectTaskTexts(eventTaskList),
        endDate: epDateEnabled ? epDate.value : null,
        createdAt: Date.now(),
      };
      projects.unshift(project);
      saveProjects();
      renderLists();
      closeListEditor();
      openProgressDetail(project.id);
    }
  }

  // ---- 进度详情 ----
  function getCurrentProject() {
    return projects.find((p) => p.id === currentProgressId);
  }

  function openProgressDetail(projectId) {
    currentProgressId = projectId;
    renderProgressDetail();
    progressDetail.hidden = false;
  }

  function closeProgressDetail() {
    progressDetail.hidden = true;
    currentProgressId = null;
  }

  function renderProgressDetail() {
    const project = getCurrentProject();
    if (!project) return;
    progressDetail.className = 'detail-overlay ptype-' + project.ptype;
    progressDiaryFab.hidden = project.ptype !== 'event';
    if (project.ptype === 'number') renderNumberProgress(project);
    else renderEventProgress(project);
  }

  function renderNumberProgress(project) {
    progressDetailContent.innerHTML = '';

    const cur = numericCurrent(project);
    const pct = projectPercent(project);
    const remainingNum = Math.max(0, (project.target || 0) - cur);

    const box = document.createElement('div');
    box.className = 'progress-box';

    const name = document.createElement('div');
    name.className = 'progress-box-name';
    name.textContent = project.name;
    box.appendChild(name);

    const current = document.createElement('div');
    current.className = 'np-current';
    const curNum = document.createElement('span');
    curNum.textContent = cur;
    current.appendChild(curNum);
    const unitSpan = document.createElement('span');
    unitSpan.className = 'np-unit' + (project.unit ? '' : ' empty');
    unitSpan.textContent = project.unit || '单位';
    unitSpan.title = '点击修改单位';
    unitSpan.addEventListener('click', () => {
      const input = document.createElement('input');
      input.type = 'text';
      input.className = 'np-unit-input';
      input.value = project.unit || '';
      input.placeholder = '单位';
      current.replaceChild(input, unitSpan);
      input.focus();
      let committed = false;
      const commit = () => {
        if (committed) return;
        committed = true;
        project.unit = input.value.trim();
        saveProjects();
        renderProgressDetail();
      };
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          commit();
        }
      });
      input.addEventListener('blur', commit);
    });
    current.appendChild(unitSpan);

    const bar = document.createElement('div');
    bar.className = 'progress-bar';
    const fill = document.createElement('div');
    fill.className = 'progress-fill';
    fill.style.width = pct + '%';
    bar.appendChild(fill);
    box.appendChild(current);
    box.appendChild(bar);

    const remaining = document.createElement('div');
    remaining.className = 'np-remaining';
    let remText = '距离目标数字还剩 ' + remainingNum + (project.targetUnit || project.unit || '');
    if (project.targetDate) {
      const days = Math.ceil((new Date(project.targetDate + 'T00:00:00') - new Date(todayStr() + 'T00:00:00')) / 86400000);
      remText += ' · 距离目标时间还剩 ' + (days >= 0 ? days + ' 天' : '已过期');
    }
    remaining.textContent = remText;

    const addForm = document.createElement('div');
    addForm.className = 'np-add';
    const numInput = document.createElement('input');
    numInput.type = 'number';
    numInput.className = 'num-input';
    numInput.placeholder = '添加数字';
    numInput.inputMode = 'decimal';
    const noteInput = document.createElement('input');
    noteInput.type = 'text';
    noteInput.className = 'num-input';
    noteInput.placeholder = '备注（可选）';
    const addBtn = document.createElement('button');
    addBtn.type = 'button';
    addBtn.className = 'add-btn';
    addBtn.textContent = '添加';
    addBtn.addEventListener('click', () => {
      const n = parseFloat(numInput.value);
      if (isNaN(n) || n === 0) {
        numInput.focus();
        return;
      }
      if (!project.additions) project.additions = [];
      project.additions.unshift({ id: uid(), num: n, note: noteInput.value.trim(), ts: Date.now() });
      saveProjects();
      renderProgressDetail();
      renderLists();
    });
    addForm.appendChild(numInput);
    addForm.appendChild(noteInput);
    addForm.appendChild(addBtn);

    const log = document.createElement('div');
    log.className = 'np-log';
    (project.additions || []).forEach((a) => {
      const wrap = document.createElement('div');
      wrap.className = 'swipe-item np-log-swipe';

      const actions = document.createElement('div');
      actions.className = 'swipe-actions';
      const delBtn = document.createElement('button');
      delBtn.type = 'button';
      delBtn.className = 'swipe-btn swipe-delete';
      delBtn.textContent = '删除';
      delBtn.addEventListener('click', () => {
        project.additions = project.additions.filter((x) => (x.id || x.ts) !== (a.id || a.ts));
        saveProjects();
        renderProgressDetail();
        renderLists();
      });
      actions.appendChild(delBtn);

      const content = document.createElement('div');
      content.className = 'swipe-content np-log-item';

      const num = document.createElement('div');
      num.className = 'np-log-num';
      num.textContent = (a.num > 0 ? '+' : '') + a.num + (project.unit || '');
      const meta = document.createElement('div');
      meta.className = 'np-log-meta';
      meta.textContent = formatDateTime(a.ts);
      content.appendChild(num);
      content.appendChild(meta);
      if (a.note) {
        const note = document.createElement('div');
        note.className = 'np-log-note';
        note.textContent = a.note;
        content.appendChild(note);
      }

      wrap.appendChild(actions);
      wrap.appendChild(content);
      enableSwipe(wrap, content);
      log.appendChild(wrap);
    });

    progressDetailContent.appendChild(box);
    progressDetailContent.appendChild(remaining);
    progressDetailContent.appendChild(addForm);
    progressDetailContent.appendChild(log);
  }

  function enableTaskDrag(project, taskList) {
    let dragWrap = null;
    let dragIndex = -1;
    let startY = 0;
    let pressTimer = null;
    let dragging = false;

    taskList.addEventListener('pointerdown', (e) => {
      if (e.target.closest('button, input, textarea')) return;
      const wrap = e.target.closest('.task-swipe');
      if (!wrap) return;
      dragWrap = wrap;
      dragIndex = Array.from(taskList.querySelectorAll('.task-swipe')).indexOf(wrap);
      startY = e.clientY;
      dragging = false;
      pressTimer = setTimeout(() => {
        dragging = true;
        dragWrap.classList.add('dragging');
        dragWrap.style.transition = 'none';
      }, 450);
    });

    taskList.addEventListener('pointermove', (e) => {
      if (!dragWrap) return;
      if (!dragging) {
        if (Math.abs(e.clientY - startY) > 10) {
          clearTimeout(pressTimer);
          dragWrap = null;
          dragIndex = -1;
        }
        return;
      }
      dragWrap.style.transform = 'translateY(' + (e.clientY - startY) + 'px)';
    });

    const end = () => {
      clearTimeout(pressTimer);
      if (!dragWrap) return;
      if (dragging) {
        const rect = dragWrap.getBoundingClientRect();
        const centerY = rect.top + rect.height / 2;
        let targetIndex = 0;
        Array.from(taskList.querySelectorAll('.task-swipe')).forEach((w) => {
          if (w === dragWrap) return;
          const r = w.getBoundingClientRect();
          if (r.top + r.height / 2 < centerY) targetIndex++;
        });
        dragWrap.style.transform = '';
        dragWrap.classList.remove('dragging');
        if (targetIndex !== dragIndex && project.tasks) {
          const [moved] = project.tasks.splice(dragIndex, 1);
          project.tasks.splice(targetIndex, 0, moved);
          saveProjects();
        }
        dragging = false;
        renderProgressDetail();
      }
      dragWrap = null;
      dragIndex = -1;
    };

    taskList.addEventListener('pointerup', end);
    taskList.addEventListener('pointercancel', end);
  }

  function renderEventProgress(project) {
    progressDetailContent.innerHTML = '';

    const tasks = project.tasks || [];
    const pct = projectPercent(project);
    const doneCount = tasks.filter((t) => t.done).length;

    const box = document.createElement('div');
    box.className = 'progress-box';

    const name = document.createElement('div');
    name.className = 'progress-box-name';
    name.textContent = project.name;
    box.appendChild(name);

    const bar = document.createElement('div');
    bar.className = 'progress-bar';
    const fill = document.createElement('div');
    fill.className = 'progress-fill';
    fill.style.width = pct + '%';
    bar.appendChild(fill);
    box.appendChild(bar);

    const meta = document.createElement('div');
    meta.className = 'np-remaining';
    meta.textContent = doneCount + ' / ' + tasks.length + ' 已完成' + (project.endDate ? ' · 目标 ' + project.endDate : '');
    box.appendChild(meta);

    const taskList = document.createElement('div');
    taskList.className = 'event-task-list';

    tasks.forEach((t) => {
      const wrap = document.createElement('div');
      wrap.className = 'swipe-item task-swipe';

      const actions = document.createElement('div');
      actions.className = 'swipe-actions';

      const editBtn = document.createElement('button');
      editBtn.type = 'button';
      editBtn.className = 'swipe-btn swipe-edit';
      editBtn.textContent = '编辑';

      const delBtn = document.createElement('button');
      delBtn.type = 'button';
      delBtn.className = 'swipe-btn swipe-delete';
      delBtn.textContent = '删除';
      delBtn.addEventListener('click', () => {
        project.tasks = (project.tasks || []).filter((x) => x.id !== t.id);
        saveProjects();
        renderProgressDetail();
        renderLists();
      });

      actions.appendChild(editBtn);
      actions.appendChild(delBtn);

      const content = document.createElement('div');
      content.className = 'swipe-content event-task' + (t.done ? ' done' : '');

      const row = document.createElement('div');
      row.className = 'event-task-row';

      const check = document.createElement('button');
      check.type = 'button';
      check.className = 'sub-check' + (t.done ? ' checked' : '');
      check.setAttribute('aria-label', '勾选');
      check.innerHTML = CHECK_SVG;
      check.addEventListener('click', () => {
        t.done = !t.done;
        t.doneAt = t.done ? Date.now() : null;
        saveProjects();
        renderProgressDetail();
        renderLists();
      });

      const text = document.createElement('span');
      text.className = 'sub-text';
      text.textContent = t.text;

      editBtn.addEventListener('click', () => {
        content.style.transform = '';
        wrap.classList.remove('open');
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'task-edit-input';
        input.value = t.text;
        row.replaceChild(input, text);
        input.focus();
        let committed = false;
        const commit = () => {
          if (committed) return;
          committed = true;
          const val = input.value.trim();
          if (val) {
            t.text = val;
            saveProjects();
          }
          renderProgressDetail();
        };
        input.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            commit();
          }
        });
        input.addEventListener('blur', commit);
      });

      row.appendChild(check);
      row.appendChild(text);
      content.appendChild(row);

      if (t.done) {
        const noteInput = document.createElement('input');
        noteInput.type = 'text';
        noteInput.className = 'task-note-input';
        noteInput.placeholder = '备注（可选）';
        noteInput.value = t.note || '';
        noteInput.addEventListener('input', () => {
          t.note = noteInput.value.trim();
          saveProjects();
        });
        content.appendChild(noteInput);
      }

      wrap.appendChild(actions);
      wrap.appendChild(content);
      enableSwipe(wrap, content);
      taskList.appendChild(wrap);
    });

    const addForm = document.createElement('div');
    addForm.className = 'event-add-form';
    const addInput = document.createElement('input');
    addInput.type = 'text';
    addInput.className = 'event-add-input';
    addInput.placeholder = '添加新的事情…';
    addInput.autocomplete = 'off';
    const addBtn = document.createElement('button');
    addBtn.type = 'button';
    addBtn.className = 'add-btn';
    addBtn.textContent = '添加';
    addBtn.addEventListener('click', () => {
      const text = addInput.value.trim();
      if (!text) {
        addInput.focus();
        return;
      }
      if (!project.tasks) project.tasks = [];
      project.tasks.push({ id: uid(), text: text, done: false, note: '', doneAt: null });
      saveProjects();
      renderProgressDetail();
      renderLists();
    });
    addInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        addBtn.click();
      }
    });
    addForm.appendChild(addInput);
    addForm.appendChild(addBtn);

    progressDetailContent.appendChild(box);
    progressDetailContent.appendChild(taskList);
    progressDetailContent.appendChild(addForm);

    enableTaskDrag(project, taskList);
  }

  function formatDiaryDate(day) {
    const parts = day.split('-').map(Number);
    return parts[0] + '年' + parts[1] + '月' + parts[2] + '日';
  }

  function getDiaryDays(project) {
    const map = {};
    (project.tasks || []).forEach((t) => {
      if (!t.done || !t.doneAt) return;
      const day = dateStr(new Date(t.doneAt));
      if (!map[day]) map[day] = [];
      map[day].push({ kind: 'task', text: t.text, note: t.note, ts: t.doneAt });
    });
    (project.diary || []).forEach((e) => {
      const day = e.date;
      if (!map[day]) map[day] = [];
      map[day].push({ kind: 'manual', type: e.type, text: e.text, ts: e.ts });
    });
    const days = Object.keys(map).sort();
    return days.map((day) => ({ day, entries: map[day].sort((a, b) => a.ts - b.ts) }));
  }

  function openProjectDiary() {
    const project = getCurrentProject();
    if (!project) return;
    diaryTitle.textContent = project.name + ' · 日记';
    diaryDays = getDiaryDays(project);
    diaryPageIndex = diaryDays.length - 1;
    renderDiaryPage();
    projectDiary.hidden = false;
  }

  function closeProjectDiary() {
    projectDiary.hidden = true;
  }

  function renderDiaryPage() {
    const page = diaryDays[diaryPageIndex];
    diaryPage.innerHTML = '';
    if (!page) {
      const empty = document.createElement('p');
      empty.className = 'empty-state';
      empty.textContent = '还没有记录';
      diaryPage.appendChild(empty);
      diaryPrev.disabled = true;
      diaryNext.disabled = true;
      diaryIndicator.textContent = '0 / 0';
      return;
    }
    const dateHeader = document.createElement('div');
    dateHeader.className = 'diary-page-date';
    dateHeader.textContent = formatDiaryDate(page.day);
    diaryPage.appendChild(dateHeader);
    page.entries.forEach((e) => diaryPage.appendChild(createDiaryEntry(e)));
    diaryPrev.disabled = diaryPageIndex === 0;
    diaryNext.disabled = diaryPageIndex === diaryDays.length - 1;
    diaryIndicator.textContent = (diaryPageIndex + 1) + ' / ' + diaryDays.length;
  }

  function createDiaryEntry(e) {
    const el = document.createElement('div');
    el.className = 'diary-entry';

    const text = document.createElement('div');
    text.className = 'diary-entry-text';
    const b = document.createElement('strong');
    if (e.kind === 'task') {
      b.textContent = '✓ ';
    } else {
      b.textContent = e.type + '：';
    }
    text.appendChild(b);
    text.appendChild(document.createTextNode(e.text));
    el.appendChild(text);

    if (e.kind === 'task' && e.note) {
      const note = document.createElement('div');
      note.className = 'diary-entry-note';
      note.textContent = e.note;
      el.appendChild(note);
    }

    const time = document.createElement('div');
    time.className = 'diary-entry-time';
    time.textContent = formatDateTime(e.ts);
    el.appendChild(time);

    return el;
  }

  function openDiaryNote() {
    diaryNoteDate.value = todayStr();
    diaryNoteType = '复盘';
    diaryNoteTypeOptions.forEach((o) => o.classList.toggle('active', o.dataset.type === '复盘'));
    diaryNoteText.value = '';
    diaryNoteOverlay.hidden = false;
    requestAnimationFrame(() => diaryNoteText.focus());
  }

  function closeDiaryNote() {
    diaryNoteOverlay.hidden = true;
  }

  function saveDiaryNote() {
    const project = getCurrentProject();
    if (!project) return;
    const text = diaryNoteText.value.trim();
    if (!text) return;
    if (!project.diary) project.diary = [];
    project.diary.push({
      id: uid(),
      date: diaryNoteDate.value || todayStr(),
      type: diaryNoteType,
      text: text,
      ts: Date.now(),
    });
    saveProjects();
    closeDiaryNote();
    diaryDays = getDiaryDays(project);
    diaryPageIndex = diaryDays.length - 1;
    renderDiaryPage();
  }

  // ---- 清单详情 ----
  let currentListId = null;

  function getCurrentList() {
    return lists.find((l) => l.id === currentListId);
  }

  function openListDetail(listId) {
    currentListId = listId;
    renderListDetail();
    listDetail.hidden = false;
  }

  function closeListDetail() {
    listDetail.hidden = true;
    currentListId = null;
  }

  function renderListDetail() {
    const list = getCurrentList();
    if (!list) return;
    detailName.textContent = list.name;
    detailType.textContent = LIST_TYPES[list.type].label;
    detailItems.innerHTML = '';
    const items = list.items || [];
    if (items.length === 0) {
      detailEmpty.hidden = false;
      return;
    }
    detailEmpty.hidden = true;
    items.forEach((it) => detailItems.appendChild(createDetailItem(it)));
  }

  function createDetailItem(item) {
    return buildTaskItem(item, {
      onToggle: () => {
        item.done = !item.done;
        saveLists();
        renderListDetail();
      },
      onToggleSub: (s) => {
        s.done = !s.done;
        saveLists();
        renderListDetail();
      },
      onDelete: () => {
        const list = getCurrentList();
        if (!list) return;
        list.items = (list.items || []).filter((x) => x.id !== item.id);
        saveLists();
        renderListDetail();
      },
      onPin: () => {
        const list = getCurrentList();
        if (!list || !list.items) return;
        const idx = list.items.indexOf(item);
        if (idx > 0) {
          list.items.splice(idx, 1);
          list.items.unshift(item);
          saveLists();
          renderListDetail();
        }
      },
    });
  }

  // ---- 列表事项编辑器 ----
  function openItemEditor() {
    itemEditorTitle.value = '';
    itemEditorDesc.value = '';
    itemEditorSubs.innerHTML = '';
    addSubRow(itemEditorSubs, false, null);
    itemEditorOverlay.hidden = false;
    requestAnimationFrame(() => itemEditorTitle.focus());
  }

  function closeItemEditor() {
    itemEditorOverlay.hidden = true;
    itemAddBtn.focus();
  }

  function collectAndSaveItem() {
    const title = itemEditorTitle.value.trim();
    if (!title) {
      itemEditorTitle.focus();
      return;
    }
    const list = getCurrentList();
    if (!list) return;
    if (!list.items) list.items = [];
    list.items.unshift({
      id: uid(),
      title: title,
      desc: itemEditorDesc.value.trim(),
      subs: collectSubs(itemEditorSubs),
      done: false,
      createdAt: Date.now(),
    });
    saveLists();
    renderListDetail();
    closeItemEditor();
  }

  // ---- 备忘录模块 ----
  let memoSaveTimer = null;

  function loadMemos() {
    try {
      const data = JSON.parse(localStorage.getItem(MEMO_STORAGE_KEY) || '[]');
      return Array.isArray(data) ? data : [];
    } catch (e) {
      return [];
    }
  }

  function saveMemos() {
    try {
      localStorage.setItem(MEMO_STORAGE_KEY, JSON.stringify(memos));
    } catch (e) {}
  }

  function loadMemoCategories() {
    const defaults = ['备忘录', '头脑风暴', '复盘'];
    try {
      const data = JSON.parse(localStorage.getItem(MEMO_CATEGORIES_KEY) || '[]');
      if (!Array.isArray(data)) return defaults.slice();
      const merged = defaults.slice();
      data.forEach((c) => {
        if (c && !merged.includes(c)) merged.push(c);
      });
      return merged;
    } catch (e) {
      return defaults.slice();
    }
  }

  function saveMemoCategories() {
    try {
      localStorage.setItem(MEMO_CATEGORIES_KEY, JSON.stringify(memoCategories));
    } catch (e) {}
  }

  function loadActiveCategory() {
    try {
      return localStorage.getItem(MEMO_ACTIVE_CATEGORY_KEY) || '备忘录';
    } catch (e) {
      return '备忘录';
    }
  }

  function saveActiveCategory() {
    try {
      localStorage.setItem(MEMO_ACTIVE_CATEGORY_KEY, activeCategory);
    } catch (e) {}
  }

  function formatMemoDate(ts) {
    if (!ts) return '';
    const d = new Date(ts);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const that = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const diff = Math.round((today - that) / 86400000);
    if (diff === 0) {
      const hh = String(d.getHours()).padStart(2, '0');
      const mm = String(d.getMinutes()).padStart(2, '0');
      return '今天 ' + hh + ':' + mm;
    }
    if (diff === 1) return '昨天';
    return (d.getMonth() + 1) + '月' + d.getDate() + '日';
  }

  function renderMemos() {
    memoList.innerHTML = '';
    const filtered = memos.filter((m) => (m.category || '备忘录') === activeCategory);
    if (filtered.length === 0) {
      memoEmpty.hidden = false;
      return;
    }
    memoEmpty.hidden = true;
    filtered.sort((a, b) => b.updatedAt - a.updatedAt).forEach((m) => {
      memoList.appendChild(createMemoItem(m));
    });
  }

  function createMemoItem(memo) {
    const li = document.createElement('li');
    li.className = 'swipe-item';

    const actions = document.createElement('div');
    actions.className = 'swipe-actions';

    const delBtn = document.createElement('button');
    delBtn.type = 'button';
    delBtn.className = 'swipe-btn swipe-delete';
    delBtn.textContent = '删除';
    delBtn.addEventListener('click', () => {
      memos = memos.filter((m) => m.id !== memo.id);
      saveMemos();
      renderMemos();
    });
    actions.appendChild(delBtn);

    const content = document.createElement('div');
    content.className = 'swipe-content memo-card';

    const info = document.createElement('div');
    info.className = 'memo-info';

    const title = document.createElement('div');
    title.className = 'memo-title';
    title.textContent = memo.title || '无标题';

    const preview = document.createElement('div');
    preview.className = 'memo-preview';
    preview.textContent = memo.body || '暂无内容';

    info.appendChild(title);
    info.appendChild(preview);

    const date = document.createElement('div');
    date.className = 'memo-date';
    date.textContent = formatMemoDate(memo.updatedAt);

    content.appendChild(info);
    content.appendChild(date);
    content.addEventListener('click', () => openMemoEditor(memo.id));

    li.appendChild(actions);
    li.appendChild(content);
    enableSwipe(li, content);

    return li;
  }

  function renderMemoCategoryMenu() {
    memoCategoryLabel.textContent = activeCategory;
    memoCategoryMenu.innerHTML = '';
    memoCategories.forEach((cat) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'memo-cat-option' + (cat === activeCategory ? ' active' : '');
      btn.textContent = cat;
      btn.addEventListener('click', () => switchMemoCategory(cat));
      memoCategoryMenu.appendChild(btn);
    });
    const addBtn = document.createElement('button');
    addBtn.type = 'button';
    addBtn.className = 'memo-cat-add';
    addBtn.textContent = '+ 添加分类';
    addBtn.addEventListener('click', () => showAddCategoryInput(addBtn));
    memoCategoryMenu.appendChild(addBtn);
  }

  function switchMemoCategory(cat) {
    activeCategory = cat;
    saveActiveCategory();
    renderMemoCategoryMenu();
    renderMemos();
    memoCategoryMenu.hidden = true;
  }

  function showAddCategoryInput(addBtn) {
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'memo-cat-input';
    input.placeholder = '分类名称';
    addBtn.style.display = 'none';
    addBtn.parentNode.insertBefore(input, addBtn.nextSibling);
    input.focus();
    let committed = false;
    const commit = () => {
      if (committed) return;
      committed = true;
      const name = input.value.trim();
      if (name && !memoCategories.includes(name)) {
        memoCategories.push(name);
        saveMemoCategories();
        activeCategory = name;
        saveActiveCategory();
      }
      renderMemoCategoryMenu();
      renderMemos();
    };
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        commit();
      }
    });
    input.addEventListener('blur', commit);
  }

  function openMemoEditor(memoId) {
    currentMemoId = memoId;
    const memo = memoId ? memos.find((m) => m.id === memoId) : null;
    memoEditorTitle.value = memo ? memo.title : '';
    memoEditorBody.value = memo ? memo.body : '';
    memoEditorDate.textContent = memo ? formatMemoDate(memo.updatedAt) : formatMemoDate(Date.now());
    memoEditorOverlay.hidden = false;
    requestAnimationFrame(() => {
      if (memo) memoEditorBody.focus();
      else memoEditorTitle.focus();
    });
    autoGrow(memoEditorBody);
  }

  function closeMemoEditor() {
    memoEditorOverlay.hidden = true;
    currentMemoId = null;
  }

  function saveCurrentMemo() {
    const title = memoEditorTitle.value.trim();
    const body = memoEditorBody.value.trim();

    if (!title && !body) {
      if (currentMemoId) {
        memos = memos.filter((m) => m.id !== currentMemoId);
        currentMemoId = null;
      }
      saveMemos();
      return;
    }

    if (currentMemoId) {
      const memo = memos.find((m) => m.id === currentMemoId);
      if (memo) {
        memo.title = title;
        memo.body = body;
        memo.updatedAt = Date.now();
      }
    } else {
      const memo = {
        id: uid(),
        title: title,
        body: body,
        category: activeCategory,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      memos.unshift(memo);
      currentMemoId = memo.id;
    }
    memoEditorDate.textContent = formatMemoDate(Date.now());
    saveMemos();
  }

  function scheduleMemoSave() {
    clearTimeout(memoSaveTimer);
    memoSaveTimer = setTimeout(saveCurrentMemo, 300);
  }

  function autoGrow(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  function commitMemoAndClose() {
    clearTimeout(memoSaveTimer);
    saveCurrentMemo();
    renderMemos();
    closeMemoEditor();
  }

  // ---- 梦模块 ----
  function loadDreams() {
    try {
      const data = JSON.parse(localStorage.getItem(DREAM_STORAGE_KEY) || '[]');
      return Array.isArray(data) ? data : [];
    } catch (e) {
      return [];
    }
  }

  function saveDreams() {
    try {
      localStorage.setItem(DREAM_STORAGE_KEY, JSON.stringify(dreams));
    } catch (e) {}
  }

  function renderDreams() {
    dreamList.innerHTML = '';
    if (dreams.length === 0) {
      dreamEmpty.hidden = false;
      return;
    }
    dreamEmpty.hidden = true;
    dreams.forEach((d) => dreamList.appendChild(createDreamItem(d)));
  }

  function createDreamItem(dream) {
    const li = document.createElement('li');
    li.className = 'dream-item';

    const wrap = document.createElement('div');
    wrap.className = 'swipe-item dream-swipe';

    const actions = document.createElement('div');
    actions.className = 'swipe-actions';
    const delBtn = document.createElement('button');
    delBtn.type = 'button';
    delBtn.className = 'swipe-btn swipe-delete';
    delBtn.textContent = '删除';
    delBtn.addEventListener('click', () => {
      dreams = dreams.filter((d) => d.id !== dream.id);
      saveDreams();
      renderDreams();
    });
    actions.appendChild(delBtn);

    const content = document.createElement('div');
    content.className = 'swipe-content dream-card';

    if (dream.kind === 'text') {
      if (dream.title) {
        const title = document.createElement('div');
        title.className = 'dream-title';
        title.textContent = dream.title;
        content.appendChild(title);
      }
      if (dream.body) {
        const body = document.createElement('div');
        body.className = 'dream-body';
        body.textContent = dream.body;
        content.appendChild(body);
      }
    } else {
      if (dream.topText) {
        const top = document.createElement('div');
        top.className = 'dream-text-above';
        top.textContent = dream.topText;
        content.appendChild(top);
      }
      if (dream.media) {
        if (dream.mediaType === 'video') {
          const v = document.createElement('video');
          v.src = dream.media;
          v.controls = true;
          v.className = 'dream-media';
          content.appendChild(v);
        } else {
          const img = document.createElement('img');
          img.src = dream.media;
          img.className = 'dream-media';
          content.appendChild(img);
        }
      }
      if (dream.bottomText) {
        const bottom = document.createElement('div');
        bottom.className = 'dream-text-below';
        bottom.textContent = dream.bottomText;
        content.appendChild(bottom);
      }
    }

    wrap.appendChild(actions);
    wrap.appendChild(content);
    enableSwipe(wrap, content);

    const date = document.createElement('div');
    date.className = 'dream-date';
    date.textContent = formatMemoDate(dream.createdAt);

    li.appendChild(wrap);
    li.appendChild(date);
    return li;
  }

  function openDreamEditor() {
    currentDreamKind = 'text';
    currentDreamMedia = null;
    currentDreamMediaType = null;
    dreamTextTitle.value = '';
    dreamTextBody.value = '';
    dreamPhotoTop.value = '';
    dreamPhotoBottom.value = '';
    dreamPhotoFile.value = '';
    dreamPhotoPreview.innerHTML = '';
    dreamPhotoPreview.hidden = true;
    dreamKindOptions.forEach((k) => k.classList.toggle('active', k.dataset.kind === 'text'));
    dreamTextFields.hidden = false;
    dreamPhotoFields.hidden = true;
    dreamEditorOverlay.hidden = false;
    requestAnimationFrame(() => dreamTextTitle.focus());
  }

  function closeDreamEditor() {
    dreamEditorOverlay.hidden = true;
  }

  function renderDreamPreview() {
    dreamPhotoPreview.innerHTML = '';
    if (!currentDreamMedia) {
      dreamPhotoPreview.hidden = true;
      return;
    }
    dreamPhotoPreview.hidden = false;
    if (currentDreamMediaType === 'video') {
      const v = document.createElement('video');
      v.src = currentDreamMedia;
      v.controls = true;
      dreamPhotoPreview.appendChild(v);
    } else {
      const img = document.createElement('img');
      img.src = currentDreamMedia;
      dreamPhotoPreview.appendChild(img);
    }
  }

  function collectAndSaveDream() {
    if (currentDreamKind === 'text') {
      const title = dreamTextTitle.value.trim();
      const body = dreamTextBody.value.trim();
      if (!title && !body) {
        dreamTextTitle.focus();
        return;
      }
      dreams.unshift({ id: uid(), kind: 'text', title: title, body: body, createdAt: Date.now() });
    } else {
      const top = dreamPhotoTop.value.trim();
      const bottom = dreamPhotoBottom.value.trim();
      if (!currentDreamMedia) {
        dreamPhotoSelect.focus();
        return;
      }
      dreams.unshift({
        id: uid(),
        kind: 'photo',
        topText: top,
        bottomText: bottom,
        media: currentDreamMedia,
        mediaType: currentDreamMediaType,
        createdAt: Date.now(),
      });
    }
    saveDreams();
    renderDreams();
    closeDreamEditor();
  }

  // ---- 我模块 ----
  function loadProfile() {
    try {
      const data = JSON.parse(localStorage.getItem(ME_STORAGE_KEY) || '{}');
      return { id: data.id || '', signature: data.signature || '', avatar: data.avatar || '' };
    } catch (e) {
      return { id: '', signature: '', avatar: '' };
    }
  }

  function saveProfile() {
    try {
      localStorage.setItem(ME_STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {}
  }

  function renderProfile() {
    meId.textContent = profile.id;
    meSignature.textContent = profile.signature;
    if (profile.avatar) {
      meAvatarImg.src = profile.avatar;
      meAvatarImg.hidden = false;
      meAvatarPlaceholder.hidden = true;
    } else {
      meAvatarImg.hidden = true;
      meAvatarPlaceholder.hidden = false;
    }
  }

  // ---- 梦：音乐播放器 ----
  function ensureAudio() {
    if (!musicAudio) {
      musicAudio = new Audio();
      musicAudio.addEventListener('ended', nextMusic);
      musicAudio.addEventListener('play', () => {
        isMusicPlaying = true;
        updateMusicUI();
      });
      musicAudio.addEventListener('pause', () => {
        isMusicPlaying = false;
        updateMusicUI();
      });
    }
  }

  function playMusic(index) {
    if (!musicList.length) return;
    currentMusicIndex = index;
    ensureAudio();
    musicAudio.src = musicList[index].src;
    musicAudio.play().catch(() => {});
    updateMusicUI();
    renderMusicList();
  }

  function exitMusicMode() {
    if (musicAudio) {
      musicAudio.pause();
      musicAudio.src = '';
    }
    currentMusicIndex = -1;
    isMusicPlaying = false;
    musicExited = true;
    musicBar.classList.add('music-exit');
    setTimeout(() => {
      updateMusicUI();
      musicBar.classList.remove('music-exit');
    }, 300);
  }

  function togglePlay() {
    if (!musicList.length) {
      musicFileInput.click();
      return;
    }
    if (musicExited) {
      musicExited = false;
      if (currentMusicIndex < 0) currentMusicIndex = 0;
      playMusic(currentMusicIndex);
      return;
    }
    ensureAudio();
    if (isMusicPlaying) {
      musicAudio.pause();
    } else {
      if (currentMusicIndex < 0) currentMusicIndex = 0;
      if (!musicAudio.src) playMusic(currentMusicIndex);
      else musicAudio.play().catch(() => {});
    }
  }

  function nextMusic() {
    if (!musicList.length) return;
    let idx;
    if (playMode === 'random') {
      idx = Math.floor(Math.random() * musicList.length);
    } else {
      idx = (currentMusicIndex + 1) % musicList.length;
    }
    playMusic(idx);
  }

  function prevMusic() {
    if (!musicList.length) return;
    const idx = (currentMusicIndex - 1 + musicList.length) % musicList.length;
    playMusic(idx);
  }

  function togglePlayMode() {
    playMode = playMode === 'list' ? 'random' : 'list';
    updateMusicUI();
  }

  function addMusicFiles(files) {
    for (const file of files) {
      if (!file.type.startsWith('audio') && !file.type.startsWith('video')) continue;
      musicCounter++;
      musicList.push({
        id: uid(),
        name: '🎵音乐' + musicCounter,
        src: URL.createObjectURL(file),
        type: file.type.startsWith('video') ? 'video' : 'audio',
      });
    }
    updateMusicUI();
    renderMusicList();
    if (musicList.length && currentMusicIndex < 0) playMusic(0);
  }

  function updateMusicUI() {
    if (!musicList.length || musicExited) {
      musicBar.hidden = true;
      musicListPanel.hidden = true;
      btnDreamMusic.classList.remove('playing');
      return;
    }
    musicBar.hidden = false;
    btnDreamMusic.classList.toggle('playing', isMusicPlaying);
    if (currentMusicIndex >= 0 && musicList[currentMusicIndex]) {
      musicName.textContent = musicList[currentMusicIndex].name;
    }
    musicPlay.textContent = isMusicPlaying ? '⏸️' : '▶️';
    musicMode.textContent = playMode === 'random' ? '🔀' : '🔁';
  }

  function renderMusicList() {
    musicListEl.innerHTML = '';
    musicList.forEach((m, i) => {
      const item = document.createElement('li');
      item.className = 'music-list-item' + (i === currentMusicIndex ? ' playing' : '');
      const name = document.createElement('span');
      name.textContent = m.name;
      name.style.cssText = 'flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;';
      const del = document.createElement('button');
      del.type = 'button';
      del.className = 'music-del';
      del.textContent = '×';
      del.addEventListener('click', (e) => {
        e.stopPropagation();
        musicList.splice(i, 1);
        if (currentMusicIndex === i) {
          if (musicAudio) {
            musicAudio.pause();
            musicAudio.src = '';
          }
          currentMusicIndex = -1;
        } else if (currentMusicIndex > i) {
          currentMusicIndex--;
        }
        updateMusicUI();
        renderMusicList();
      });
      item.appendChild(name);
      item.appendChild(del);
      item.addEventListener('click', () => playMusic(i));
      musicListEl.appendChild(item);
    });
  }

  // ---- 点击音效 ----
  function playClickSound() {
    try {
      if (!clickAudioCtx) clickAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (clickAudioCtx.state === 'suspended') clickAudioCtx.resume();
      const osc = clickAudioCtx.createOscillator();
      const gain = clickAudioCtx.createGain();
      osc.connect(gain);
      gain.connect(clickAudioCtx.destination);
      osc.type = 'sine';
      osc.frequency.value = 660;
      gain.gain.setValueAtTime(0.06, clickAudioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, clickAudioCtx.currentTime + 0.1);
      osc.start();
      osc.stop(clickAudioCtx.currentTime + 0.1);
    } catch (e) {}
  }

  // ---- 页面切换 ----
  function switchPage(page) {
    currentPage = page;
    pages.forEach((p) => {
      p.hidden = p.id !== 'page-' + page;
    });
    tabs.forEach((t) => {
      const active = t.dataset.page === page;
      t.classList.toggle('active', active);
      t.setAttribute('aria-selected', String(active));
    });
  }

  // ---- 事件绑定 ----
  addBtn.addEventListener('click', () => {
    currentPlanDate = currentSeg === 'diary' ? dateStr(selectedDate) : todayStr();
    openEditor();
  });

  todaySignature.addEventListener('input', () => {
    localStorage.setItem(SIGNATURE_KEY, todaySignature.textContent.trim());
  });
  todaySignature.addEventListener('blur', () => {
    const v = todaySignature.textContent.trim();
    todaySignature.textContent = v;
    localStorage.setItem(SIGNATURE_KEY, v);
  });

  segButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      currentSeg = btn.dataset.seg;
      segButtons.forEach((b) => b.classList.toggle('active', b.dataset.seg === currentSeg));
      todayView.hidden = currentSeg !== 'today';
      diaryView.hidden = currentSeg !== 'diary';
      if (currentSeg === 'diary') {
        renderCalendar();
        renderDiaryPlans();
      }
    });
  });
  editorCancel.addEventListener('click', closeEditor);
  editorDone.addEventListener('click', collectAndSave);
  editorOverlay.addEventListener('click', (e) => {
    if (e.target === editorOverlay) closeEditor();
  });

  listAddBtn.addEventListener('click', openListEditor);
  listEditorCancel.addEventListener('click', closeListEditor);
  listEditorSave.addEventListener('click', collectAndSaveList);
  listEditorOverlay.addEventListener('click', (e) => {
    if (e.target === listEditorOverlay) closeListEditor();
  });

  kindOptions.forEach((btn) => {
    btn.addEventListener('click', () => {
      currentKind = btn.dataset.kind;
      kindOptions.forEach((b) => b.classList.toggle('active', b.dataset.kind === currentKind));
      listFields.hidden = currentKind !== 'list';
      progressFields.hidden = currentKind !== 'progress';
    });
  });

  listTypeOptions.forEach((opt) => {
    opt.addEventListener('click', () => {
      currentListType = opt.dataset.type;
      listTypeOptions.forEach((o) => o.classList.toggle('active', o.dataset.type === currentListType));
    });
  });

  progressTypeOptions.forEach((opt) => {
    opt.addEventListener('click', () => {
      currentPType = opt.dataset.ptype;
      progressTypeOptions.forEach((o) => o.classList.toggle('active', o.dataset.ptype === currentPType));
      numberProgressFields.hidden = currentPType !== 'number';
      eventProgressFields.hidden = currentPType !== 'event';
    });
  });

  npDateToggle.addEventListener('click', () => {
    npDateEnabled = !npDateEnabled;
    npDateToggle.classList.toggle('on', npDateEnabled);
    npDateToggle.setAttribute('aria-pressed', String(npDateEnabled));
    npDate.hidden = !npDateEnabled;
  });

  epDateToggle.addEventListener('click', () => {
    epDateEnabled = !epDateEnabled;
    epDateToggle.classList.toggle('on', epDateEnabled);
    epDateToggle.setAttribute('aria-pressed', String(epDateEnabled));
    epDate.hidden = !epDateEnabled;
  });

  addEventTaskBtn.addEventListener('click', () => addSubRow(eventTaskList, true));

  progressBack.addEventListener('click', closeProgressDetail);

  btnDiaryOpen.addEventListener('click', openProjectDiary);
  diaryBack.addEventListener('click', closeProjectDiary);
  diaryPrev.addEventListener('click', () => {
    if (diaryPageIndex > 0) {
      diaryPageIndex--;
      renderDiaryPage();
    }
  });
  diaryNext.addEventListener('click', () => {
    if (diaryPageIndex < diaryDays.length - 1) {
      diaryPageIndex++;
      renderDiaryPage();
    }
  });
  btnDiaryWrite.addEventListener('click', openDiaryNote);
  diaryNoteCancel.addEventListener('click', closeDiaryNote);
  diaryNoteSave.addEventListener('click', saveDiaryNote);
  diaryNoteTypeOptions.forEach((o) => {
    o.addEventListener('click', () => {
      diaryNoteType = o.dataset.type;
      diaryNoteTypeOptions.forEach((x) => x.classList.toggle('active', x.dataset.type === diaryNoteType));
    });
  });
  diaryNoteOverlay.addEventListener('click', (e) => {
    if (e.target === diaryNoteOverlay) closeDiaryNote();
  });
  diaryNoteText.addEventListener('input', () => autoGrow(diaryNoteText));

  detailBack.addEventListener('click', closeListDetail);
  itemAddBtn.addEventListener('click', openItemEditor);
  itemEditorCancel.addEventListener('click', closeItemEditor);
  itemEditorDone.addEventListener('click', collectAndSaveItem);
  itemEditorOverlay.addEventListener('click', (e) => {
    if (e.target === itemEditorOverlay) closeItemEditor();
  });

  memoAddBtn.addEventListener('click', () => openMemoEditor(null));
  memoCategoryBtn.addEventListener('click', () => {
    renderMemoCategoryMenu();
    memoCategoryMenu.hidden = !memoCategoryMenu.hidden;
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.memo-header')) {
      memoCategoryMenu.hidden = true;
    }
  });

  dreamAddBtn.addEventListener('click', openDreamEditor);
  dreamEditorCancel.addEventListener('click', closeDreamEditor);
  dreamEditorSave.addEventListener('click', collectAndSaveDream);
  dreamEditorOverlay.addEventListener('click', (e) => {
    if (e.target === dreamEditorOverlay) closeDreamEditor();
  });
  dreamKindOptions.forEach((k) => {
    k.addEventListener('click', () => {
      currentDreamKind = k.dataset.kind;
      dreamKindOptions.forEach((b) => b.classList.toggle('active', b.dataset.kind === currentDreamKind));
      dreamTextFields.hidden = currentDreamKind !== 'text';
      dreamPhotoFields.hidden = currentDreamKind !== 'photo';
    });
  });
  dreamPhotoSelect.addEventListener('click', () => dreamPhotoFile.click());
  dreamPhotoFile.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    currentDreamMediaType = file.type.startsWith('video') ? 'video' : 'image';
    if (currentDreamMediaType === 'image') {
      const reader = new FileReader();
      reader.onload = () => {
        currentDreamMedia = reader.result;
        renderDreamPreview();
      };
      reader.readAsDataURL(file);
    } else {
      currentDreamMedia = URL.createObjectURL(file);
      renderDreamPreview();
    }
  });
  dreamTextBody.addEventListener('input', () => autoGrow(dreamTextBody));

  // 音乐图标：点按播放/暂停，长按添加离线音乐
  let musicLongPressTimer = null;
  let musicLongPressed = false;
  btnDreamMusic.addEventListener('pointerdown', () => {
    musicLongPressed = false;
    musicLongPressTimer = setTimeout(() => {
      musicLongPressed = true;
      musicFileInput.click();
    }, 550);
  });
  btnDreamMusic.addEventListener('pointerup', () => clearTimeout(musicLongPressTimer));
  btnDreamMusic.addEventListener('pointerleave', () => clearTimeout(musicLongPressTimer));
  btnDreamMusic.addEventListener('click', () => {
    if (musicLongPressed) {
      musicLongPressed = false;
      return;
    }
    togglePlay();
  });
  musicFileInput.addEventListener('change', (e) => {
    addMusicFiles(e.target.files);
    e.target.value = '';
  });
  musicPlay.addEventListener('click', togglePlay);
  musicNext.addEventListener('click', nextMusic);
  musicPrev.addEventListener('click', prevMusic);
  musicMode.addEventListener('click', togglePlayMode);
  musicListBtn.addEventListener('click', () => {
    renderMusicList();
    musicListPanel.hidden = !musicListPanel.hidden;
  });

  // 音乐条左滑 → 退出音乐模式（停止播放并隐藏播放条）
  let musicBarStartX = 0;
  let musicBarStartY = 0;
  musicBar.addEventListener('pointerdown', (e) => {
    musicBarStartX = e.clientX;
    musicBarStartY = e.clientY;
  });
  musicBar.addEventListener('pointerup', (e) => {
    const dx = e.clientX - musicBarStartX;
    const dy = e.clientY - musicBarStartY;
    if (dx < -50 && Math.abs(dx) > Math.abs(dy)) {
      exitMusicMode();
    }
  });

  // 全局：所有按钮点击弹跳动画 + 音效
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (btn) {
      btn.classList.remove('pop');
      void btn.offsetWidth;
      btn.classList.add('pop');
      playClickSound();
    }
  });

  meAvatar.addEventListener('click', () => meAvatarFile.click());
  meAvatarFile.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      profile.avatar = reader.result;
      saveProfile();
      renderProfile();
    };
    reader.readAsDataURL(file);
  });
  meId.addEventListener('input', () => {
    profile.id = meId.textContent;
    saveProfile();
  });
  meId.addEventListener('blur', () => {
    profile.id = meId.textContent.trim();
    saveProfile();
    meId.textContent = profile.id;
  });
  meSignature.addEventListener('input', () => {
    profile.signature = meSignature.textContent;
    saveProfile();
  });
  meSignature.addEventListener('blur', () => {
    profile.signature = meSignature.textContent.trim();
    saveProfile();
    meSignature.textContent = profile.signature;
  });
  memoEditorBack.addEventListener('click', commitMemoAndClose);
  memoEditorDone.addEventListener('click', commitMemoAndClose);
  memoEditorTitle.addEventListener('input', scheduleMemoSave);
  memoEditorBody.addEventListener('input', () => {
    scheduleMemoSave();
    autoGrow(memoEditorBody);
  });
  memoEditorOverlay.addEventListener('click', (e) => {
    if (e.target === memoEditorOverlay) commitMemoAndClose();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (!memoEditorOverlay.hidden) commitMemoAndClose();
      else if (!dreamEditorOverlay.hidden) closeDreamEditor();
      else if (!itemEditorOverlay.hidden) closeItemEditor();
      else if (!listEditorOverlay.hidden) closeListEditor();
      else if (!editorOverlay.hidden) closeEditor();
      else if (!diaryNoteOverlay.hidden) closeDiaryNote();
      else if (!progressDetail.hidden) closeProgressDetail();
      else if (!projectDiary.hidden) closeProjectDiary();
      else if (!listDetail.hidden) closeListDetail();
    }
  });

  tabs.forEach((t) => t.addEventListener('click', () => switchPage(t.dataset.page)));

  // ---- 初始化 ----
  todaySignature.textContent = localStorage.getItem(SIGNATURE_KEY) || '';
  rerenderTodayModule();
  renderLists();
  renderMemos();
  renderMemoCategoryMenu();
  renderDreams();
  renderProfile();
  setInterval(updateDate, 30000); // 跨天时自动刷新日期

  // ---- Service Worker ----
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const hadController = !!navigator.serviceWorker.controller;
      navigator.serviceWorker.register('./sw.js').catch(() => {});
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (hadController) location.reload(); // 新版本接管后自动刷新一次
      });
    });
  }

  // ---- 版本检查：检测到新版本自动刷新 ----
  fetch('./version.json?t=' + Date.now())
    .then((r) => r.json())
    .then((data) => {
      const v = String(data.version);
      const stored = localStorage.getItem('app-version');
      if (stored && stored !== v) {
        location.reload();
      }
      localStorage.setItem('app-version', v);
    })
    .catch(() => {});
})();
