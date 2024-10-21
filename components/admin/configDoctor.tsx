import { DOCTORSConfType } from "@/lib/types"

export default function ConfigDoctor(configSetDoctor:any)
{
  const setDoctor:DOCTORSConfType[]= configSetDoctor.configSetDoctor

  return (
    <div id="doctor-section" className="mb-8 mx-auto max-w-2xl">
      <hr className="my-8 border-t-2 border-gray-300 mx-auto max-w-2xl " />
      <h2 className="text-2xl font-semibold text-accent-600">Docteurs</h2>
      <br />
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 text-left font-medium">Docteur</th>
            <th className="border px-4 py-2 text-left font-medium">
              Prestations
            </th>
          </tr>
        </thead>
        <tbody>
          {setDoctor.map((confDoctor, index) => (
            <tr key={index} className="border-t">
              <td className="border px-4 py-2">{confDoctor.user}</td>
              <td className="border px-4 py-2">| {confDoctor.option.map((opt) => {
                return (opt+" | ")
              })}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}




//
// import { useState } from "react";
// import { DOCTORSConfType } from "@/lib/types";
//
// export default function ConfigDoctor({ configSetDoctor }: { configSetDoctor: DOCTORSConfType[] }) {
//   const [doctors, setDoctors] = useState<DOCTORSConfType[]>(configSetDoctor);
//
//   const handleDoctorChange = (index: number, newDoctorName: string) => {
//     const updatedDoctors = [...doctors];
//     updatedDoctors[index] = { ...updatedDoctors[index], user: newDoctorName };
//     setDoctors(updatedDoctors);
//   };
//
//   const handleOptionChange = (doctorIndex: number, optionIndex: number, newOption: string) => {
//     const updatedDoctors = [...doctors];
//     const updatedOptions = [...updatedDoctors[doctorIndex].option];
//     updatedOptions[optionIndex] = newOption;
//     updatedDoctors[doctorIndex].option = updatedOptions;
//     setDoctors(updatedDoctors);
//   };
//
//   const handleAddOption = (doctorIndex: number) => {
//     const updatedDoctors = [...doctors];
//     updatedDoctors[doctorIndex].option.push("");
//     setDoctors(updatedDoctors);
//   };
//
//   return (
//     <div id="doctor-section" className="mb-8 mx-auto max-w-2xl">
//       <hr className="my-8 border-t-2 border-gray-300 mx-auto max-w-2xl" />
//       <h2 className="text-2xl font-semibold text-accent-600">Docteurs</h2>
//       <br />
//       <table className="min-w-full table-auto border-collapse border border-gray-300">
//         <thead className="bg-gray-100">
//         <tr>
//           <th className="border px-4 py-2 text-left font-medium">Docteur</th>
//           <th className="border px-4 py-2 text-left font-medium">Prestations</th>
//         </tr>
//         </thead>
//         <tbody>
//         {doctors.map((confDoctor, doctorIndex) => (
//           <tr key={doctorIndex} className="border-t">
//             <td className="border px-4 py-2">
//               <input
//                 type="text"
//                 value={confDoctor.user}
//                 onChange={(e) => handleDoctorChange(doctorIndex, e.target.value)}
//                 className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-accent-600 focus:border-accent-600 sm:text-sm"
//               />
//             </td>
//
//             <td className="border px-4 py-2">
//               {confDoctor.option.map((opt, optionIndex) => (
//                 <div key={optionIndex} className="flex items-center mb-2">
//                   <input
//                     type="text"
//                     value={opt}
//                     onChange={(e) => handleOptionChange(doctorIndex, optionIndex, e.target.value)}
//                     className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-accent-600 focus:border-accent-600 sm:text-sm"
//                   />
//                 </div>
//               ))}
//               <button
//                 type="button"
//                 onClick={() => handleAddOption(doctorIndex)}
//                 className="mt-2 inline-flex w-full justify-center rounded-md bg-accent-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-accent-500 sm:w-auto"
//               >
//                 Ajouter Prestation
//               </button>
//             </td>
//           </tr>
//         ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }