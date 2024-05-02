export function AddFilterButton({ onAdd }: { onAdd: React.MouseEventHandler<HTMLButtonElement> }) {
  return (
    <button
      className="md:w-1/6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      id="add-field-button"
      onClick={onAdd}
    >
      Añadir filtro
    </button>
  )
}