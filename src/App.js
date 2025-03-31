import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useState } from "react";

/**
 * Функция для расчета ежемесячного платежа
 * sumCredit - сумма кредита
 * procentInYear - процентная ставка
 * year - на какой период
 */
const mortgage = (sumCredit, procentInYear, year) => {
  const p = procentInYear / 1200;
  const n = year * 12;
  return Math.round((sumCredit * p) / (1 - Math.pow(1 + p, -n)));
};

/**
 * Функция для расчета суммы переплаты
 * sumCredit - сумма кредита
 * procentInYear - процентная ставка
 * year - на какой период
 * p - процентная ставка;
 * n - кол-во платежных периодов;
 */
const overpayment = (sumCredit, procentInYear, year) => {
  const monthlyPayment = mortgage(sumCredit, procentInYear, year);
  const n = year * 12;
  return Math.round(monthlyPayment * n - sumCredit);
};

function App() {
  const [credits, setCredits] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [termLoan, setTermLoan] = useState(0);

  // ежемесячный платеж
  const mounthPayment = mortgage(credits, interestRate, termLoan);
  // Перплата
  const overPayment = overpayment(credits, interestRate, termLoan);
  // Общая сумма
  const summa = Number(credits) + Number(overPayment) || 0;

  return (
    <div className="container">
      <h1 className="my-3 bl">Кредитный калькулятор</h1>
      <p>
        Кредитный калькулятор позволяет онлайн рассчитать и сравнить размер
        ежемесячного платежа, сумму переплаты и процентной ставки по
        интересующему вас кредиту.
      </p>
      <div className="row d-flex mortgage">
        <div className="col-md-6">
          <form id="mortgage-form">
            <div className="border-input">
              <label>Сумма кредита</label>
              <input
                type="number"
                placeholder="2 000 000"
                autoComplete="off"
                value={credits}
                onChange={(e) => setCredits(e.target.value)}
              />
            </div>
            <div className="d-flex justify-content-between">
              <p>1000 ₽</p>
              <p>200 000 000 ₽</p>
            </div>
            <div className="border-input">
              <label>Ставка</label>
              <input
                type="number"
                placeholder="21 "
                autoComplete="off"
                value={interestRate}
                onChange={(e) => {
                  setInterestRate(e.target.value);
                }}
              />
            </div>
            <div className="">
              <p>Ключевая ставка Банка России</p>
            </div>
            <div className="border-input">
              <label>Срок кредита</label>
              <input
                type="text"
                placeholder="5"
                autoComplete="off"
                value={termLoan}
                onChange={(e) => setTermLoan(e.target.value)}
              />
            </div>
          </form>
        </div>
        <div className="col-md-6 payment">
          <h3 className="bl mb-4">Результаты просчета</h3>
          <div className="d-flex justify-content-between my-2">
            <label>Ежемесячный платеж</label>
            <strong className="bl" id="result">
              {Number.isInteger(mounthPayment) ? mounthPayment : 0} ₽
            </strong>
          </div>
          <div className="d-flex justify-content-between my-2">
            <label>Сумма кредита:</label>
            <strong className="bl" id="result">
              {credits} ₽
            </strong>
          </div>

          <div className="d-flex justify-content-between my-2">
            <label>Переплата:</label>
            <strong className="bl">
              {Number.isInteger(overPayment) ? overPayment : 0} ₽
            </strong>
          </div>
          <div className="d-flex justify-content-between my-2">
            <label>Общая сумма:</label>
            <strong className="bl">{summa} ₽</strong>
          </div>
          <hr className="line" />
          <div className="d-flex my-2">
            <img width="24px" src="./img/calendar.svg" alt="Иконка" />
            <span className="bl">График платежей</span>
          </div>
          <h3 className="my-3 bl">Получите реальные условия от банков</h3>
          <p>Начните оформление заявки сейчас</p>
          <a href="#">Заполнить анкету</a>
        </div>
      </div>
    </div>
  );
}

export default App;
