import ExpenseList from "./components/ExpenseList";
import CategoryList from "./components/CategoryList";
import AddExpense from "./components/AddExpense";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Expense Tracker</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <AddExpense />
          <CategoryList />
        </div>

        <ExpenseList />
      </div>
    </div>
  );
}

export default App;
