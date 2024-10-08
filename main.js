const calcButton = document.getElementById("check");
const results = document.getElementById("results");

function f(x) {
  let result = 3 * x - 4 * Math.log(x) - 5;
  return result;
}

function fp(x, eps) {
  let D = eps / 1000.0;
  return (f(x + D) - f(x)) / D;
}

function f2p(x, eps) {
  let D = eps / 1000.0;
  return (f(x + D) + f(x - D) - 2 * f(x)) / (D * D);
}

const NewtonMethod = () => {
  const a = parseFloat(document.getElementById("A").value);
  const b = parseFloat(document.getElementById("B").value);
  const eps = parseFloat(document.getElementById("Epsilon").value);
  const kMax = parseInt(document.getElementById("Kmax").value, 10);

  if (isNaN(a) || isNaN(b) || isNaN(eps) || isNaN(kMax)) {
    results.innerHTML = "Помилка: одне з введених значень не є числом.";
    return;
  }

  let x, Dx, iterationCount;

  x = (a + b) / 2;
  iterationCount = 0;

  console.log(`Початкове значення x: ${x}`);

  if ((f(x, eps) * f2p(x, eps)) < 0) {
    x = a;
  } else if ((f(x, eps) * f2p(x, eps)) == 0) {
    results.innerHTML = "Для заданого рiвняння збiжнiсть методу Ньютона не гарантується";
    return;
  }

  for (let i = 0; i < kMax; i++) {
    Dx = f(x, eps) / fp(x, eps);
    x = x - Dx;
    iterationCount += 1;

    console.log(`Ітерація ${i + 1}, x: ${x}, Dx: ${Dx}`);

    if (Math.abs(Dx) < eps) {
      results.innerHTML = `Метод Ньютона: знайдене наближене значення кореня: ${x} <br> Кількість ітерацій: ${iterationCount}`;
      return;
    }
  }

  results.innerHTML = "Метод Ньютона: За задану кiлькiсть iтерацiй корiнь з точнiстю Eps не знайдено";
};

calcButton.addEventListener('click', NewtonMethod);