import * as React from "react";

type Debt = {
  debtName: string;
  totalPayoff: number;
  minPayment: number;
  newPayment: number;
  isPaidOff?: boolean;
};

const initialDebt: Debt = {
  debtName: "",
  totalPayoff: 0,
  minPayment: 0,
  newPayment: 0,
};

export default function DebtSnowballWebForm() {
  const [debts, setDebts] = React.useState<Debt[]>([initialDebt]);

  const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newDebts = [...debts];
    const nameParts = event.target.name.split('-');
    const name = nameParts[0] as keyof Debt;

    if (name === "debtName") {
        (newDebts[index] as any)[name] = event.target.value;
    } else {
        (newDebts[index] as any)[name] = Number(event.target.value);
    }

    // If minPayment changes, update newPayment for that row if it's not crossed out
    if (name === 'minPayment' && !newDebts[index].isPaidOff) {
      newDebts[index].newPayment = (newDebts[index] as any)[name];
    }

    setDebts(newDebts);
  };

    // When adding a row, initialize newPayment to be same as minPayment
    const handleAddRow = () => {
        const newDebtRow = { ...initialDebt };
    
        // If the last row is marked as 'paid off', add its 'newPayment' value to the 'minPayment'
        // value of the new row to determine its 'newPayment'.
        if (debts.length > 0 && debts[debts.length - 1].isPaidOff) {
          newDebtRow.minPayment += debts[debts.length - 1].newPayment;
        }
    
        newDebtRow.newPayment = newDebtRow.minPayment;
        setDebts(prevDebts => [...prevDebts, newDebtRow]);
      };

  const handlePayOffDebt = (index: number) => {
    const newDebts = [...debts];
    if (index < newDebts.length - 1) {
        newDebts[index + 1].newPayment += newDebts[index].newPayment;
    }
    newDebts[index].isPaidOff = true;
    setDebts(newDebts);
  };

  const handleRemoveRow = (index: number) => {
    const newDebts = [...debts];
    newDebts.splice(index, 1);
    setDebts(newDebts);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(debts);
  };

  return (
    <div>
      <h1>Debt Snowball Web Form</h1>

      <form onSubmit={handleSubmit}>
        <table>
          <thead>
            <tr>
              <th>Debts</th>
              <th>Total Payoff</th>
              <th>Min Payment</th>
              <th>New Payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {debts.map((debt, index) => (
              <tr key={index} style={debt.isPaidOff ? { textDecoration: 'line-through' } : {}}>
                <td>
                  <input
                    type="text"
                    name={`debtName-${index}`}
                    value={debt.debtName}
                    onChange={(event) => handleInputChange(index, event)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name={`totalPayoff-${index}`}
                    value={debt.totalPayoff}
                    onChange={(event) => handleInputChange(index, event)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name={`minPayment-${index}`}
                    value={debt.minPayment}
                    onChange={(event) => handleInputChange(index, event)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name={`newPayment-${index}`}
                    value={index === 0 ? debt.minPayment : debt.newPayment}
                    readOnly
                  />
                </td>
                <td>
                  {!debt.isPaidOff && index === debts.findIndex(d => !d.isPaidOff) ? (
                    <button type="button" onClick={() => handlePayOffDebt(index)}>
                      Debt paid off
                    </button>
                  ) : null}
                  <button type="button" onClick={() => handleRemoveRow(index)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" onClick={handleAddRow}>Add Debt</button>
        <button type="submit">Submit</button>
      </form>

      <div>
        <h3>Instructions:</h3>
        <p>Step 1: List your debts in order from the smallest Total Payoff balance to the largest. Don’t be concerned with interest rates, unless two debts have a similar payoff balance. In that case, list the one with the higher interest rate first.</p>
        <p>Step 2: Attack that smallest debt by paying as much on it as you possibly can. Once you pay one debt off, take what you were paying on that one and add it to the minimum payment of the next debt. As the snowball rolls over, it picks up more snow. Get it?</p>
        <p>Step 3: Every time you pay off a debt, cross the debt off. This will show you how close you’re getting to becoming debt-free!</p>
      </div>
    </div>
  );
}
