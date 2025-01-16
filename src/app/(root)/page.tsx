import Header from "./_components/Header"
import EditorPanel from "./_components/EditorPanel"
import OutputPanel from "./_components/OutputPanel"

function page() {
  return (
    <div className="min-h-screen">
      <div className="max-w-[1800px] mx-auto p-4">

          <Header />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <EditorPanel />
            <OutputPanel />
          </div>
      </div> 
    </div>
  )
}

export default page