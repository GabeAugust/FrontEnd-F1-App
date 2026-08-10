import Header from "../components/Header.tsx"
const App = () => {
  return (
  
    <main className="min-h-screen bg-zinc-950 text-white">
      <Header />

      <section
        className="
      relative
      min-h-screen
      bg-[linear-gradient(90deg,rgba(0,0,0,0.95)_0%,rgba(0,0,0,0.70)_42%,rgba(0,0,0,0.30)_75%,rgba(0,0,0,0.55)_100%),url('../src/assets/f1-bg.jpg')]
      bg-cover
      bg-center
      bg-no-repeat
    "
      >
        {/* seu conteúdo */}

        <div className="absolute inset-0 bg-linear-to-r from-black via-black/50 to-transparent" />

        <div
          className="
        pointer-events-none
        absolute
        inset-x-0
        bottom-0
        h-[45vh]
        bg-linear-to-b
        from-transparent
        via-zinc-950/70
        to-zinc-950
      "
        />
      </section>

      <section className="min-h-screen bg-zinc-950">
      </section>
    </main>
  );
}

export default App; 