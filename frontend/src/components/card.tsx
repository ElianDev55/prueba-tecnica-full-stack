import type { CardInterface } from "../interfaces/card.interface";

export const Card = ({ item }: { item: CardInterface }) => {
  return (
  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">

      <div className="aspect-square overflow-hidden">
        <img
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.name}</h3>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-cyan-60">${item.price}</span>
          <button
            className="bg-cyan-400 text-white px-4 py-2 rounded-md hover:bg-cyan-600 transition-colors"
            onClick={() => console.log(`Agregado: ${item.name}`)}
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
};
