import { Battle, Notification, RankingEntry, User } from '@/types';

// Helper to generate placeholder images (Unsplash, более надёжно для продакшена)
const getAvatar = (id: number) =>
  `https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=facearea&w=200&h=200&q=80&facepad=2&sat=-15&sig=${id}`;
const getCover = (id: number) =>
  `https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&h=600&q=80&sat=-15&sig=${id}`;

export const CURRENT_USER: User = {
  id: 'u1',
  username: 'Игрок1',
  avatarUrl: getAvatar(99),
};

export const MOCK_STORIES: User[] = [
  { id: 's1', username: 'Игрок2', avatarUrl: getAvatar(101) },
  { id: 's2', username: 'Игрок3', avatarUrl: getAvatar(102) },
  { id: 's3', username: 'Игрок4', avatarUrl: getAvatar(103) },
  { id: 's4', username: 'Игрок5', avatarUrl: getAvatar(104) },
  { id: 's5', username: 'Игрок6', avatarUrl: getAvatar(105) },
];

export const MOCK_BATTLES: Battle[] = [
  {
    id: 'b1',
    title: 'Clean and jerk: 80 kg',
    category: 'CrossFit',
    status: 'active',
    participant1: { id: 'p1', username: 'Игрок2', avatarUrl: getAvatar(1) },
    participant2: { id: 'p2', username: 'Игрок1', avatarUrl: getAvatar(99) },
  },
  {
    id: 'b2',
    title: 'Slam Dunk',
    category: 'Basketball',
    status: 'waiting',
    participant1: { id: 'p3', username: 'Игрок3', avatarUrl: getAvatar(3) },
  },
  {
    id: 'b3',
    title: 'Slam Dunk',
    category: 'Basketball',
    status: 'finished',
    participant1: { id: 'p4', username: 'Игрок4', avatarUrl: getAvatar(4) },
    participant2: { id: 'p5', username: 'Игрок5', avatarUrl: getAvatar(5) },
    winnerId: 'p4',
    date: '12.08.25',
    stats: { views: 6700, comments: 256, shares: 148 }
  },
  {
    id: 'b4',
    title: 'Mathematics',
    category: 'Intellectual',
    status: 'finished',
    participant1: { id: 'p6', username: 'Игрок6', avatarUrl: getAvatar(6) },
    participant2: { id: 'p7', username: 'Игрок7', avatarUrl: getAvatar(7) },
    winnerId: 'p6',
  },
];

export const MOCK_RANKING: RankingEntry[] = [
  { id: 'r1', user: { id: 'p2', username: 'Игрок1', avatarUrl: getAvatar(99) }, rank: 1, points: 1241, trend: 'same' },
  { id: 'r2', user: { id: 'p1', username: 'Игрок2', avatarUrl: getAvatar(1) }, rank: 2, points: 1000, trend: 'up' },
  { id: 'r3', user: { id: 'p8', username: 'Игрок3', avatarUrl: getAvatar(8) }, rank: 3, points: 996, trend: 'down' },
  { id: 'r4', user: { id: 'p9', username: 'Игрок4', avatarUrl: getAvatar(9) }, rank: 4, points: 991, trend: 'up' },
  { id: 'r5', user: { id: 'p10', username: 'Игрок5', avatarUrl: getAvatar(10) }, rank: 5, points: 904, trend: 'down' },
  { id: 'r6', user: { id: 'p11', username: 'Игрок6', avatarUrl: getAvatar(11) }, rank: 6, points: 856, trend: 'up' },
  { id: 'r7', user: { id: 'p12', username: 'Игрок7', avatarUrl: getAvatar(12) }, rank: 7, points: 798, trend: 'down' },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 'n1', user: { id: 'n_u1', username: 'Игрок8', avatarUrl: getAvatar(20) }, message: 'Applied to your contest', time: '11:30', isRead: false },
  { id: 'n2', user: { id: 'n_u2', username: 'Игрок9', avatarUrl: getAvatar(21) }, message: 'Has accepted your application for...', time: '09:11', isRead: true },
  { id: 'n3', user: { id: 'n_u3', username: 'Система', avatarUrl: getAvatar(22) }, message: 'The status of the competition has changed', time: '07:24', isRead: true },
];

import { Discipline, PresetRule } from '@/types';

export const DISCIPLINES: { value: Discipline; label: string; description: string; icon: string }[] = [
  { value: 'CrossFit', label: 'CrossFit', description: 'Функциональный фитнес и силовые тренировки', icon: '💪' },
  { value: 'Basketball', label: 'Баскетбол', description: 'Баскетбольные навыки и трюки', icon: '🏀' },
  { value: 'Intellectual', label: 'Интеллектуальные', description: 'Математика, логика, головоломки', icon: '🧠' },
  { value: 'Weightlifting', label: 'Тяжёлая атлетика', description: 'Силовые упражнения и поднятие тяжестей', icon: '🏋️' },
  { value: 'Running', label: 'Бег', description: 'Беговые дисциплины и выносливость', icon: '🏃' },
  { value: 'Yoga', label: 'Йога', description: 'Гибкость, баланс и медитация', icon: '🧘' },
  { value: 'MartialArts', label: 'Боевые искусства', description: 'Бокс, карате, дзюдо и другие', icon: '🥋' },
  { value: 'Swimming', label: 'Плавание', description: 'Плавание и водные виды спорта', icon: '🏊' },
];

export const FAIR_PLAY_RULES = [
  {
    id: '1',
    title: 'Честная запись видео',
    description: 'Видео должно быть записано без монтажа и редактирования. Показывай реальные результаты.',
    icon: '🎥'
  },
  {
    id: '2',
    title: 'Уважение к соперникам',
    description: 'Относись к другим участникам с уважением. Спортивное поведение — основа сообщества.',
    icon: '🤝'
  },
  {
    id: '3',
    title: 'Соблюдение правил дисциплины',
    description: 'Следуй правилам выбранной дисциплины. Честность превыше всего.',
    icon: '📋'
  },
  {
    id: '4',
    title: 'Запрет на запрещённые вещества',
    description: 'Использование допинга, запрещённых веществ или методов строго запрещено.',
    icon: '🚫'
  },
  {
    id: '5',
    title: 'Один аккаунт — один человек',
    description: 'Не используй несколько аккаунтов для участия в одних и тех же соревнованиях.',
    icon: '👤'
  },
];

export const PRESET_RULES: PresetRule[] = [
  // CrossFit
  {
    id: 'cf1',
    name: 'Max reps in 60s',
    description: 'Максимальное количество повторений за 60 секунд',
    discipline: 'CrossFit',
  },
  {
    id: 'cf2',
    name: '1RM Clean and Jerk',
    description: 'Одноповторный максимум в толчке',
    discipline: 'CrossFit',
  },
  {
    id: 'cf3',
    name: 'AMRAP 5 minutes',
    description: 'Как можно больше раундов за 5 минут',
    discipline: 'CrossFit',
  },
  {
    id: 'cf4',
    name: 'Burpee Challenge',
    description: 'Максимальное количество бёрпи за 3 минуты',
    discipline: 'CrossFit',
  },
  // Basketball
  {
    id: 'bb1',
    name: '3-point contest',
    description: 'Конкурс трёхочковых бросков (10 попыток)',
    discipline: 'Basketball',
  },
  {
    id: 'bb2',
    name: 'Free throws',
    description: 'Штрафные броски (20 попыток)',
    discipline: 'Basketball',
  },
  {
    id: 'bb3',
    name: 'Slam dunk',
    description: 'Самый эффектный слэм-данк',
    discipline: 'Basketball',
  },
  {
    id: 'bb4',
    name: 'Dribbling challenge',
    description: 'Челлендж дриблинга (30 секунд)',
    discipline: 'Basketball',
  },
  // Intellectual
  {
    id: 'int1',
    name: 'Math speed test',
    description: 'Решение математических задач на скорость (10 задач)',
    discipline: 'Intellectual',
  },
  {
    id: 'int2',
    name: 'Puzzle solving',
    description: 'Решение головоломки на время',
    discipline: 'Intellectual',
  },
  {
    id: 'int3',
    name: 'Memory challenge',
    description: 'Запоминание последовательности (20 элементов)',
    discipline: 'Intellectual',
  },
  {
    id: 'int4',
    name: 'Logic puzzle',
    description: 'Решение логической задачи',
    discipline: 'Intellectual',
  },
  // Weightlifting
  {
    id: 'wl1',
    name: '1RM Bench Press',
    description: 'Одноповторный максимум в жиме лёжа',
    discipline: 'Weightlifting',
  },
  {
    id: 'wl2',
    name: '1RM Squat',
    description: 'Одноповторный максимум в приседе',
    discipline: 'Weightlifting',
  },
  {
    id: 'wl3',
    name: '1RM Deadlift',
    description: 'Одноповторный максимум в становой тяге',
    discipline: 'Weightlifting',
  },
  {
    id: 'wl4',
    name: 'Max reps with 80%',
    description: 'Максимум повторений с 80% от 1RM',
    discipline: 'Weightlifting',
  },
  // Running
  {
    id: 'run1',
    name: '100m sprint',
    description: 'Спринт на 100 метров',
    discipline: 'Running',
  },
  {
    id: 'run2',
    name: '1km time trial',
    description: 'Забег на 1 километр на время',
    discipline: 'Running',
  },
  {
    id: 'run3',
    name: '5km challenge',
    description: 'Забег на 5 километров',
    discipline: 'Running',
  },
  {
    id: 'run4',
    name: 'Endurance test',
    description: 'Тест на выносливость (30 минут)',
    discipline: 'Running',
  },
  // Yoga
  {
    id: 'yoga1',
    name: 'Balance challenge',
    description: 'Удержание баланса в сложной позе',
    discipline: 'Yoga',
  },
  {
    id: 'yoga2',
    name: 'Flexibility test',
    description: 'Демонстрация гибкости',
    discipline: 'Yoga',
  },
  {
    id: 'yoga3',
    name: 'Flow sequence',
    description: 'Выполнение последовательности асан',
    discipline: 'Yoga',
  },
  {
    id: 'yoga4',
    name: 'Advanced pose',
    description: 'Выполнение сложной асаны',
    discipline: 'Yoga',
  },
  // MartialArts
  {
    id: 'ma1',
    name: 'Punching speed',
    description: 'Скорость ударов (30 секунд)',
    discipline: 'MartialArts',
  },
  {
    id: 'ma2',
    name: 'Kicking technique',
    description: 'Техника ударов ногами',
    discipline: 'MartialArts',
  },
  {
    id: 'ma3',
    name: 'Kata performance',
    description: 'Выполнение ката',
    discipline: 'MartialArts',
  },
  {
    id: 'ma4',
    name: 'Combo challenge',
    description: 'Комбинация ударов',
    discipline: 'MartialArts',
  },
  // Swimming
  {
    id: 'swim1',
    name: '50m freestyle',
    description: 'Плавание вольным стилем на 50 метров',
    discipline: 'Swimming',
  },
  {
    id: 'swim2',
    name: '100m challenge',
    description: 'Плавание на 100 метров',
    discipline: 'Swimming',
  },
  {
    id: 'swim3',
    name: 'Underwater distance',
    description: 'Дистанция под водой на одном вдохе',
    discipline: 'Swimming',
  },
  {
    id: 'swim4',
    name: 'Stroke technique',
    description: 'Техника плавания',
    discipline: 'Swimming',
  },
];