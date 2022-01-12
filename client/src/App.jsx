import { Navbar, Welcome, Footer, Loader, Services, Transaction, TransactionList } from './components';

const App = () => {

  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar />
        <Welcome />
      </div>
      <Transaction />
        <Services />
        <TransactionList/>
      <Footer />
    </div>
  )
}

export default App
