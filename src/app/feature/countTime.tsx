export const CountTime = (): React.JSX.Element => {
  return(
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-8 rounded">
              <h1 className='text-red-600 text-center text-5xl font-bold'>{  }</h1>
              <p style={{ whiteSpace: 'pre-line' }}>{  }</p>
              <button 
              // onClick={}
              className="mt-4 bg-red-400 text-white px-4 py-2 rounded hover:bg-red-500" 
              >
                    閉じる
              </button>
        </div>
      </div>
    </div>
  )

}