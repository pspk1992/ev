import { useMemo, useState } from "react";
import { Calculator } from "lucide-react";

interface EmiCalculatorProps {
  price: number;
}

export function EmiCalculator({ price }: EmiCalculatorProps) {
  const [downPayment, setDownPayment] = useState(Math.round(price * 0.15));
  const [months, setMonths] = useState(60);
  const [interestRate, setInterestRate] = useState(4.9);

  const monthlyPayment = useMemo(() => {
    const principal = Math.max(price - downPayment, 0);
    const monthlyRate = interestRate / 12 / 100;
    if (monthlyRate === 0) return principal / months;
    return (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
  }, [downPayment, interestRate, months, price]);

  return (
    <div className="glass-panel p-6" data-testid="emi-calculator">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-full bg-secondary p-3 text-primary"><Calculator className="h-5 w-5" /></div>
        <div>
          <p className="eyebrow mb-2">Ownership estimator</p>
          <h3 className="text-2xl">EMI calculator</h3>
        </div>
      </div>

      <div className="grid gap-5">
        <label>
          <span className="field-label">Down payment</span>
          <input className="field-input" type="number" min={0} max={price} value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} />
        </label>
        <label>
          <span className="field-label">Loan term (months)</span>
          <input className="field-input" type="number" min={12} max={84} step={12} value={months} onChange={(e) => setMonths(Number(e.target.value))} />
        </label>
        <label>
          <span className="field-label">Interest rate %</span>
          <input className="field-input" type="number" min={0} max={15} step={0.1} value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} />
        </label>
      </div>

      <div className="mt-6 rounded-2xl border border-line/70 bg-secondary/40 p-4">
        <p className="text-sm text-muted-foreground">Estimated monthly payment</p>
        <p className="mt-2 text-3xl font-bold">${monthlyPayment.toFixed(0)}<span className="ml-1 text-base font-medium text-muted-foreground">/ month</span></p>
      </div>
    </div>
  );
}
