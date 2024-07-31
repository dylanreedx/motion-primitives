import Tabs from './components/core/tabs';

function App() {
  const tabs = ['Home', 'Analytics', 'Settings'];

  return (
    <main className='bg-black min-h-screen grid place-items-center'>
      <div className='flex flex-row'>
        <Tabs
          defaultValue={tabs[0]}
          className='rounded-lg bg-zinc-100 dark:bg-zinc-800'
          enableHover
          transition={{
            type: 'spring',
            bounce: 0.2,
            duration: 0.3,
          }}
        >
          {tabs.map((tab, index) => (
            <button
              key={index}
              data-id={tab}
              type='button'
              className='px-2 py-0.5 text-zinc-600 transition-colors duration-300 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50 dark:data-[checked=true]:text-zinc-100'
            >
              {tab}
            </button>
          ))}
        </Tabs>
      </div>
    </main>
  );
}

export default App;
