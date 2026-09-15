import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://osstep.github.io/assertion_tohaveclass');
});

test('1. Проверка начальных классов элементов', async ({ page }) => {
  // Задание: Проверить начальные классы элементов
  // 1. Найти элемент box1 и проверить что он имеет класс "active"
  // 2. Проверить что box1 не имеет класса "error"
  // 3. Найти элемент box2 и проверить что он имеет класс "error"
  // 4. Найти элемент box3 и проверить что он имеет класс "hidden"
  await expect(page.locator('#box1')).toHaveClass(/active/);
  await expect(page.locator('#box1')).not.toHaveClass(/error/);
  await expect(page.locator('#box2')).toHaveClass(/error/);
  await expect(page.locator('#box3')).toHaveClass(/hidden/);
});

test('2. Проверка переключения классов box1', async ({ page }) => {
  // Задание: Проверить изменение классов при взаимодействии
  // 1. Найти элемент box1 и проверить что он имеет класс "active"
  // 2. Нажать кнопку "Переключить box1"
  // 3. Проверить что box1 теперь имеет класс "error"
  // 4. Проверить что box1 больше не имеет класса "active"
  // 5. Еще раз нажать кнопку
  // 6. Проверить что классы вернулись к исходным
  await expect(page.locator('#box1')).toHaveClass(/active/);
  await page.getByRole('button', { name: 'Переключить box1' }).click();
  await expect(page.locator('#box1')).toHaveClass(/error/);
  await expect(page.locator('#box1')).not.toHaveClass(/active/);

  await page.getByRole('button', { name: 'Переключить box1' }).click();

  await expect(page.locator('#box1')).toHaveClass(/active/);
  await expect(page.locator('#box1')).not.toHaveClass(/error/);
  await expect(page.locator('#box2')).toHaveClass(/error/);
  await expect(page.locator('#box3')).toHaveClass(/hidden/);
});

test('3. Проверка показа/скрытия элемента', async ({ page }) => {
  // Задание: Проверить классы при скрытии/показе элемента
  // 1. Найти элемент box3 и проверить что он имеет класс "hidden"
  // 2. Нажать кнопку "Показать/скрыть box3"
  // 3. Проверить что box3 больше не имеет класса "hidden"
  // 4. Еще раз нажать кнопку
  // 5. Проверить что класс "hidden" снова присутствует
  await expect(page.locator('#box3')).toHaveClass(/hidden/);
  await page.getByRole('button', { name: 'Показать/скрыть box3' }).click();
  await expect(page.locator('#box3')).not.toHaveClass(/hidden/);
  await page.getByRole('button', { name: 'Показать/скрыть box3' }).click();
  await expect(page.locator('#box3')).toHaveClass(/hidden/);
});

test('4. Проверка классов карточки пользователя', async ({ page }) => {
  // Задание: Проверить классы карточки пользователя
  // 1. Найти карточку пользователя и проверить что у нее нет класса "premium"
  // 2. Нажать кнопку "Перейти на Премиум"
  // 3. Проверить что карточка получила класс "premium"
  // 4. Нажать кнопку "Отметить как просроченный"
  // 5. Проверить что карточка имеет оба класса: "premium" и "expired"
  // 6. Проверить что классы содержатся в любом порядке
  await expect(page.locator('#user-card')).toHaveClass(/user-card/);
  await page.getByRole('button', { name: 'Перейти на Премиум' }).click();
  await expect(page.locator('#user-card')).toHaveClass(/user-card premium/);
  await page.getByRole('button', { name: 'Отметить как просроченный' }).click();
  await expect(page.locator('#user-card')).toHaveClass(/user-card premium expired/);
  await expect(page.locator('#user-card')).toHaveClass(/premium.*expired|expired.*premium/);
});
test('5. Проверка элемента с несколькими классами', async ({ page }) => {
  // Задание: Проверить элемент с множеством классов
  // 1. Найти элемент multi-class и проверить что он имеет все классы:
  //    "box", "warning", "large", "rounded" (в любом порядке)
  // 2. Нажать кнопку "Изменить классы"
  // 3. Проверить что класс "warning" заменен на "error"
  // 4. Проверить что класс "large" удален
  // 5. Проверить что класс "rounded" остался
  // 6. Проверить что элемент имеет класс "box" (основной класс)
  await expect(page.locator('#multi-class')).toHaveClass(/box/);
  await expect(page.locator('#multi-class')).toHaveClass(/warning/);
  await expect(page.locator('#multi-class')).toHaveClass(/large/);
  await expect(page.locator('#multi-class')).toHaveClass(/rounded/);

  await page.getByRole('button', { name: 'Изменить классы' }).click();

  await expect(page.locator('#multi-class')).toHaveClass(/error/);
  await expect(page.locator('#multi-class')).not.toHaveClass(/warning/);
  await expect(page.locator('#multi-class')).not.toHaveClass(/large/);
  await expect(page.locator('#multi-class')).toHaveClass(/rounded/);
  await expect(page.locator('#multi-class')).toHaveClass(/box/);
});
