"use strict"

// Функция для решения квадратных уравнений
function solveEquation(a, b, c) {
  let d = b**2 - 4 * a * c; // Вычисляем дискриминант
  
  if (d < 0) {
    return []; // Если дискриминант меньше нуля, корней нет
  } else if (d === 0) {
    let root = -b / (2 * a); // Если дискриминант равен нулю, корень один
    return [root]; 
  } else {
    let root1 = (-b + Math.sqrt(d)) / (2 * a); // Первый корень
    let root2 = (-b - Math.sqrt(d)) / (2 * a); // Второй корень
    return [root1, root2]; // Возвращаем два корня
  }
}

// Функция для расчёта общей суммы выплат по ипотечному кредиту
function calculateTotalMortgage(percent, contribution, amount, countMonths) {
  // Преобразуем процентную ставку в месячную
  let monthlyRate = percent / 100 / 12;
  
  // Рассчитываем тело кредита (сумма, которую нужно вернуть банку)
  let loanBody = amount - contribution;
  
  // Если тело кредита отрицательное, значит первоначальный взнос больше суммы кредита, клиент ничего не должен
  if (loanBody <= 0) {
    return 0;
  }
  
  // Формула для ежемесячного платежа
  let monthlyPayment = loanBody * (monthlyRate + (monthlyRate / (Math.pow(1 + monthlyRate, countMonths) - 1)));
  
  // Общая сумма выплат
  let totalPayment = monthlyPayment * countMonths;
  
  // Округляем результат до двух знаков после запятой
  return +totalPayment.toFixed(2);
}
