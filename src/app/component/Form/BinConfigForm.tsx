// import React, { useEffect, useState } from "react";
// import api from "@/app/services/api";
// import { showErrorToast, showSuccessToast } from "@/app/utils/toastConfig";
// import { BinCnfg } from "@/app/component/types/BinConfig";
// let user = null
// if (typeof window !== "undefined") {
//     user = localStorage.getItem("userName");
// }
// type Warehouse = {
//     whsCode: string;
//     whsName: string;
// };
// interface BinConfigFormProps {
//     binConfigData?: BinCnfg | null;
// }
// const BinConfig: React.FC<BinConfigFormProps> = ({ binConfigData }) => {
//     const [wareHouse, setWareHouse] = useState<Warehouse[]>([]);
//     const [formData, setFormData] = useState({
//         binConfigIdId: 0,
//         binCode: '',
//         binName: '',
//         prefix: '',
//         whsCode: '',
//         createdBy: user,
//         createdOn: '',
//         updatedBy: '',
//         updatedOn: '',
//     });
//     const [errors, setErrors] = useState({
//         binCode: '',
//         binName: '',
//         prefix: '',
//         whsCode: '',
//     });
//     const wareHouseTypes = async () => {
//         try {
//             const response = await api.get('/WareHouse/WareHouseList');
//             debugger;
//             const wareHouseData = response.data;
//             const wareHouseNames = wareHouseData.map((item: { whsCode: string, whsName: string }) => ({
//                 whsCode: item.whsCode,
//                 whsName: item.whsName
//             }));
//             return wareHouseNames;
//         } catch (error) {
//             console.error("Error fetching warehouse types:", error);
//             return [];
//         }
//     };

//     useEffect(() => {
//         const fetchWareHouse = async () => {
//             const fetchWareHouseData = await wareHouseTypes();
//             setWareHouse(fetchWareHouseData);
//         };
//         fetchWareHouse();
//     }, []);


//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//         const { name, value, type } = e.target;
//         if (type === 'checkbox') {
//             const target = e.target as HTMLInputElement;
//             setFormData({ ...formData, [name]: target.checked });
//         }
//         else {
//             setFormData({ ...formData, [name]: value });
//         }
//     };
//     const validateForm = () => {
//         debugger
//         let isValid = true;
//         const newErrors: any = {};

//         if (!formData.binCode) {
//             newErrors.userName = "BinCode is required";
//             isValid = false;
//         }

//         if (!formData.binName) {
//             newErrors.password = "BinName is required";
//             isValid = false;
//         }

//         if (!formData.prefix) {
//             newErrors.role = "Prefix is required";
//             isValid = false;
//         }
//         if (!formData.whsCode) {
//             newErrors.wareHouse = "WareHouse is required";
//             isValid = false;
//         }

//         setErrors(newErrors);
//         return isValid;
//     };
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         debugger
//         if (validateForm()) {
//             debugger
//             console.log('BinConfigForm Submitted:', formData);
//             let BinConfigRequest;
//             if (formData.binConfigIdId > 0) {
//                 BinConfigRequest = {
//                     binConfigId: formData.binConfigIdId,
//                     binCode: formData.binCode,
//                     binName: formData.binName,
//                     prefix: formData.prefix,
//                     whsCode: formData.whsCode,
//                     createdBy: '',
//                     createdOn: new Date().toISOString(),
//                     updatedBy: user,
//                     updatedOn: new Date().toISOString(),
//                 }
//             } else {
//                 debugger;
//                 BinConfigRequest = {
//                     binConfigId: formData.binConfigIdId,
//                     binCode: formData.binCode,
//                     binName: formData.binName,
//                     prefix: formData.prefix,
//                     whsCode: formData.whsCode,
//                     createdBy: user,
//                     createdOn: new Date().toISOString(),
//                     updatedBy: user,
//                     updatedOn: new Date().toISOString(),
//                 }

//             }
//             try {

//                 let response;
//                 if (formData.binConfigIdId > 0) {
//                     const values = {
//                         userId: BinConfigRequest.binConfigId,
//                     };
//                     response = await api.put(`/BinConfig/UpdateBinConfig?id=${values.userId}`, BinConfigRequest);
//                     console.log(response);
//                 }
//                 else {
//                     debugger
//                     response = await api.post('/BinConfig/CreateBinConfig', BinConfigRequest);
//                     debugger
//                 }
//                 if (response.status === 200 || response.status === 201) {
//                     debugger
//                     if (response.data !== null) {
//                         debugger
//                         showSuccessToast(`BinConfig ${formData.binConfigIdId > 0 ? 'Updated' : 'Created'} Successfully!`);
//                         handleCancel();
//                         //router.push('/pages/adduser');
//                     } else {
//                         showErrorToast(`BinConfig ${formData.binConfigIdId > 0 ? 'Updated' : 'Created'} failed.`);
//                     }
//                 } else {
//                     showErrorToast(`BinConfig ${formData.binConfigIdId > 0 ? 'Updated' : 'Created'} failed.`);
//                 }
//             } catch (error) {
//                 showErrorToast(`BinConfig ${formData.binConfigIdId > 0 ? 'Updated' : 'Created'} failed.`);
//                 console.error('Error adding/editing BinConfig:', error);
//             }
//         }
//     };
//     const handleCancel = () => {
//         setFormData({
//             binConfigIdId: 0,
//             binCode: '',
//             binName: '',
//             prefix: '',
//             whsCode: '',
//             createdBy: user,
//             createdOn: '',
//             updatedBy: '',
//             updatedOn: '',
//         });
//         //router.push('/pages/adduser');
//     };
//     return (
//         <div className="w-full p-10 text-indigo-800 rounded-xl max-h-[700px] overflow-y-auto overflow-x-hidden p-4">
//             <h2 className="text-xl font-medium text-center text-black mb-8">
//                 Add Bin Config
//             </h2>

//             <form onSubmit={handleSubmit} className="space-y-6">
//                 <div className="grid grid-cols-1 gap-6">  {/* Updated grid structure */}

//                     {/* Warehouse */}
//                     <div className="relative">
//                         <label className="floating-label text-black font-medium">
//                             <span>WareHouseCode</span>
//                             <select
//                                 id="whsCode"
//                                 name="whsCode"
//                                 value={formData.whsCode}
//                                 onChange={handleInputChange}
//                                 className="input input-md w-full p-2 rounded-lg border-2 border-black-300 focus:ring-indigo-500 focus:outline-none"
//                                 required
//                             >
//                                 <option value="" disabled>Select Warehouse Code</option>
//                                 {wareHouse.map((item, index) => (
//                                     <option key={index} value={item.whsCode}>
//                                         {item.whsName}
//                                     </option>
//                                 ))}
//                             </select>
//                         </label>
//                     </div>

//                     <div className="flex gap-6">
//                         {/* Bin Name */}
//                         <div className="relative flex-1">
//                             <label className="floating-label text-black font-medium">
//                                 <span>SL1Code</span>
//                                 <input
//                                     type="text"
//                                     id="binName"
//                                     name="binName"
//                                     value={formData.binName}
//                                     onChange={handleInputChange}
//                                     className="input input-md w-full p-2 rounded-lg border-2 border-gray-300 focus:ring-indigo-500 focus:outline-none"
//                                     placeholder="Bin Name"
//                                     required
//                                 />
//                             </label>
//                         </div>

//                         {/* Prefix */}
//                         <div className="relative flex-1">
//                             <label className="floating-label text-black font-medium">
//                                 <span>Prefix</span>
//                                 <input
//                                     type="text"
//                                     id="prefix"
//                                     name="prefix"
//                                     value={formData.prefix}
//                                     onChange={handleInputChange}
//                                     className="input input-md w-full p-2 rounded-lg border-2 border-gray-300 focus:ring-indigo-500 focus:outline-none"
//                                     placeholder="Prefix"
//                                     required
//                                 />
//                             </label>
//                         </div>
//                     </div>

//                     <div className="flex gap-6">
//                         {/* Bin Name */}
//                         <div className="relative flex-1">
//                             <label className="floating-label text-black font-medium">
//                                 <span>SL2Code</span>
//                                 <input
//                                     type="text"
//                                     id="binName"
//                                     name="binName"
//                                     value={formData.binName}
//                                     onChange={handleInputChange}
//                                     className="input input-md w-full p-2 rounded-lg border-2 border-gray-300 focus:ring-indigo-500 focus:outline-none"
//                                     placeholder="Bin Name"
//                                     required
//                                 />
//                             </label>
//                         </div>

//                         {/* Prefix */}
//                         <div className="relative flex-1">
//                             <label className="floating-label text-black font-medium">
//                                 <span>Prefix</span>
//                                 <input
//                                     type="text"
//                                     id="prefix"
//                                     name="prefix"
//                                     value={formData.prefix}
//                                     onChange={handleInputChange}
//                                     className="input input-md w-full p-2 rounded-lg border-2 border-gray-300 focus:ring-indigo-500 focus:outline-none"
//                                     placeholder="Prefix"
//                                     required
//                                 />
//                             </label>
//                         </div>
//                     </div>
//                     <div className="flex gap-6">
//                         {/* Bin Name */}
//                         <div className="relative flex-1">
//                             <label className="floating-label text-black font-medium">
//                                 <span>SL3Code</span>
//                                 <input
//                                     type="text"
//                                     id="binName"
//                                     name="binName"
//                                     value={formData.binName}
//                                     onChange={handleInputChange}
//                                     className="input input-md w-full p-2 rounded-lg border-2 border-gray-300 focus:ring-indigo-500 focus:outline-none"
//                                     placeholder="Bin Name"
//                                     required
//                                 />
//                             </label>
//                         </div>

//                         {/* Prefix */}
//                         <div className="relative flex-1">
//                             <label className="floating-label text-black font-medium">
//                                 <span>Prefix</span>
//                                 <input
//                                     type="text"
//                                     id="prefix"
//                                     name="prefix"
//                                     value={formData.prefix}
//                                     onChange={handleInputChange}
//                                     className="input input-md w-full p-2 rounded-lg border-2 border-gray-300 focus:ring-indigo-500 focus:outline-none"
//                                     placeholder="Prefix"
//                                     required
//                                 />
//                             </label>
//                         </div>
//                     </div>
//                     <div className="flex gap-6">
//                         {/* Bin Name */}
//                         <div className="relative flex-1">
//                             <label className="floating-label text-black font-medium">
//                                 <span>SL4Code</span>
//                                 <input
//                                     type="text"
//                                     id="binName"
//                                     name="binName"
//                                     value={formData.binName}
//                                     onChange={handleInputChange}
//                                     className="input input-md w-full p-2 rounded-lg border-2 border-gray-300 focus:ring-indigo-500 focus:outline-none"
//                                     placeholder="Bin Name"
//                                     required
//                                 />
//                             </label>
//                         </div>

//                         {/* Prefix */}
//                         <div className="relative flex-1">
//                             <label className="floating-label text-black font-medium">
//                                 <span>Prefix</span>
//                                 <input
//                                     type="text"
//                                     id="prefix"
//                                     name="prefix"
//                                     value={formData.prefix}
//                                     onChange={handleInputChange}
//                                     className="input input-md w-full p-2 rounded-lg border-2 border-gray-300 focus:ring-indigo-500 focus:outline-none"
//                                     placeholder="Prefix"
//                                     required
//                                 />
//                             </label>
//                         </div>
//                     </div>
//                     <div className="flex gap-6">
//                         {/* Bin Name */}
//                         <div className="relative flex-1">
//                             <label className="floating-label text-black font-medium">
//                                 <span>SL5Code</span>
//                                 <input
//                                     type="text"
//                                     id="binName"
//                                     name="binName"
//                                     value={formData.binName}
//                                     onChange={handleInputChange}
//                                     className="input input-md w-full p-2 rounded-lg border-2 border-gray-300 focus:ring-indigo-500 focus:outline-none"
//                                     placeholder="Bin Name"
//                                     required
//                                 />
//                             </label>
//                         </div>

//                         {/* Prefix */}
//                         <div className="relative flex-1">
//                             <label className="floating-label text-black font-medium">
//                                 <span>Prefix</span>
//                                 <input
//                                     type="text"
//                                     id="prefix"
//                                     name="prefix"
//                                     value={formData.prefix}
//                                     onChange={handleInputChange}
//                                     className="input input-md w-full p-2 rounded-lg border-2 border-gray-300 focus:ring-indigo-500 focus:outline-none"
//                                     placeholder="Prefix"
//                                     required
//                                 />
//                             </label>
//                         </div>
//                     </div>

//                 </div>

//                 {/* Submit and Cancel Buttons */}
//                 <div className="flex justify-end gap-4 mt-6">
//                     <button
//                         type="submit"
//                         className="btn btn-accent text-white"
//                     >
//                         {formData.binConfigIdId > 0 ? 'Update' : 'Save'}
//                     </button>
//                     <button
//                         type="button"
//                         onClick={handleCancel}
//                         className="btn btn-outline btn-error hover:bg-red-100 hover:text-red-600"
//                     >
//                         Cancel
//                     </button>
//                 </div>
//             </form>

//         </div>

//     );
// };
// export default BinConfig;

// {/* <div className="relative">
//                         <label className="floating-label text-black font-medium">
//                             <span>BinCode</span>
//                             <input
//                                 type="text"
//                                 id="binCode"
//                                 name="binCode"
//                                 value={formData.binCode}
//                                 onChange={handleInputChange}
//                                 className="input input-md  p-2 rounded-lg border-2 border-black-300 focus:ring-indigo-500 focus:outline-none"
//                                 placeholder="BinCode"
//                                 required
//                             />
//                         </label>
//                     </div> */}

import React, { useEffect, useState } from "react";
import api from "@/app/services/api";
import { showErrorToast, showSuccessToast } from "@/app/utils/toastConfig";

let user = null;
if (typeof window !== "undefined") {
    user = localStorage.getItem("userName");
}

type Warehouse = {
    whsCode: string;
    whsName: string;
};

interface BinConfigFormProps {
    binConfigData?: any | null;
}

const BinConfig: React.FC<BinConfigFormProps> = ({ binConfigData }) => {
    const [wareHouse, setWareHouse] = useState<Warehouse[]>([]);
    const [formData, setFormData] = useState({
        binConfigId: 0,  // Assume binConfigId is 0 for new records
        whsCode: '',
        isActive: true,  // Shared isActive for all rows
        createdBy: user,
        createdOn: new Date().toISOString(),
        updatedBy: '',
        updatedOn: new Date().toISOString(),
        binConfigs: [
            { binCode: 'SL1Code', binName: '', prefix: '' },
            { binCode: 'SL2Code', binName: '', prefix: '' },
            { binCode: 'SL3Code', binName: '', prefix: '' },
            { binCode: 'SL4Code', binName: '', prefix: '' },
            { binCode: 'SL5Code', binName: '', prefix: '' },
        ]
    });

    const [errors, setErrors] = useState({
        whsCode: '',
        binConfigs: [] as any[]
    });

    const wareHouseTypes = async () => {
        try {
            const response = await api.get('/WareHouse/WareHouseList');
            const wareHouseData = response.data;
            const wareHouseNames = wareHouseData.map((item: { whsCode: string, whsName: string }) => ({
                whsCode: item.whsCode,
                whsName: item.whsName
            }));
            return wareHouseNames;
        } catch (error) {
            console.error("Error fetching warehouse types:", error);
            return [];
        }
    };

    useEffect(() => {
        const fetchWareHouse = async () => {
            const fetchWareHouseData = await wareHouseTypes();
            setWareHouse(fetchWareHouseData);
        };
        fetchWareHouse();
    }, []);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        index: number
    ) => {
        const { name, value, type } = e.target;

        // If it's a checkbox for bin configs, update the state with its checked status
        if (type === 'checkbox') {
            const updatedBinConfigs = [...formData.binConfigs];
            updatedBinConfigs[index] = { 
                ...updatedBinConfigs[index], 
                [name]: (e.target as HTMLInputElement).checked // Typecast e.target to HTMLInputElement
            };
            setFormData({ ...formData, binConfigs: updatedBinConfigs });
        } else {
            // For text inputs and selects, update the value as usual
            const updatedBinConfigs = [...formData.binConfigs];
            updatedBinConfigs[index] = { ...updatedBinConfigs[index], [name]: value };
            setFormData({ ...formData, binConfigs: updatedBinConfigs });
        }
    };

    // Handler for the 'isActive' checkbox (common for all rows)
    const handleIsActiveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, isActive: e.target.checked });
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors: any = { binConfigs: [] };

        // Validate only SL1Code (first binConfig)
        if (!formData.binConfigs[0].binName) {
            newErrors.binConfigs[0] = { ...newErrors.binConfigs[0], binName: "Bin Name for SL1Code is required" };
            isValid = false;
        }

        if (!formData.binConfigs[0].prefix) {
            newErrors.binConfigs[0] = { ...newErrors.binConfigs[0], prefix: "Prefix for SL1Code is required" };
            isValid = false;
        }

        // Validate warehouse code
        if (!formData.whsCode) {
            newErrors.wareHouse = "WareHouse is required";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            // Filter out the empty bin configurations before sending to the API
            const filteredBinConfigs = formData.binConfigs.filter(binConfig =>
                binConfig.binName !== '' && binConfig.prefix !== ''
            );

            // Prepare data to match the expected structure for the API
            const BinConfigRequest = filteredBinConfigs.map(binConfig => ({
                binConfigId: formData.binConfigId, // Use formData.binConfigId for update
                binCode: binConfig.binCode,
                binName: binConfig.binName,
                prefix: binConfig.prefix,
                whsCode: formData.whsCode,
                isActive: formData.isActive, // Shared 'isActive'
                createdBy: formData.createdBy,
                createdOn: formData.createdOn,
                updatedBy: formData.updatedBy || "string", // You can customize this if needed
                updatedOn: formData.updatedOn,
            }));

            try {
                let response;
                // Check if binConfigId is greater than 0 (update existing record)
                if (formData.binConfigId > 0) {
                    response = await api.put(`/BinConfig/UpdateBinConfig?id=${formData.binConfigId}`, BinConfigRequest);
                } else {
                    response = await api.post('/BinConfig/CreateBinConfig', BinConfigRequest);
                }

                // Handle API response
                if (response.status === 200 || response.status === 201) {
                    if (response.data !== null) {
                        showSuccessToast(`BinConfig ${formData.binConfigId > 0 ? 'Updated' : 'Created'} Successfully!`);
                        handleCancel();
                    } else {
                        showErrorToast(`BinConfig ${formData.binConfigId > 0 ? 'Updated' : 'Created'} failed.`);
                    }
                } else {
                    showErrorToast(`BinConfig ${formData.binConfigId > 0 ? 'Updated' : 'Created'} failed.`);
                }
            } catch (error) {
                showErrorToast(`BinConfig ${formData.binConfigId > 0 ? 'Updated' : 'Created'} failed.`);
                console.error('Error adding/editing BinConfig:', error);
            }
        }
    };

    const handleCancel = () => {
        setFormData({
            binConfigId: 0,  // Reset binConfigId to 0 when canceling
            whsCode: '',
            isActive: false,
            createdBy: user,
            createdOn: new Date().toISOString(),
            updatedBy: '',
            updatedOn: new Date().toISOString(),
            binConfigs: [
                { binCode: 'SL1Code', binName: '', prefix: '' },
                { binCode: 'SL2Code', binName: '', prefix: '' },
                { binCode: 'SL3Code', binName: '', prefix: '' },
                { binCode: 'SL4Code', binName: '', prefix: '' },
                { binCode: 'SL5Code', binName: '', prefix: '' },
            ]
        });
    };

    return (
        <div className="w-full p-10 text-indigo-800 rounded-xl max-h-[700px] overflow-y-auto overflow-x-hidden p-4">
            <h2 className="text-xl font-medium text-center text-black mb-8">
                {formData.binConfigId > 0 ? "Update" : "Add"} Bin Config
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6">

                    {/* Warehouse */}
                    <div className="relative">
                        <label className="floating-label text-black font-medium">
                            <span>WareHouseCode</span>
                            <select
                                id="whsCode"
                                name="whsCode"
                                value={formData.whsCode}
                                onChange={(e) => setFormData({ ...formData, whsCode: e.target.value })}
                                className="input input-md w-full p-2 rounded-lg border-2 border-black-300 focus:ring-indigo-500 focus:outline-none"
                                required
                            >
                                <option value="" disabled>Select Warehouse Code</option>
                                {wareHouse.map((item, index) => (
                                    <option key={index} value={item.whsCode}>
                                        {item.whsName}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>

                    {/* Dynamic Inputs for SL1Code to SL5Code */}
                    {formData.binConfigs.map((binConfig, index) => (
                        <div className="flex gap-6" key={index}>
                            {/* Bin Name */}
                            <div className="relative flex-1">
                                <label className="floating-label text-black font-medium">
                                    <span>{binConfig.binCode}</span>
                                    <input
                                        type="text"
                                        id={`binName-${binConfig.binCode}`}
                                        name="binName"
                                        value={binConfig.binName}
                                        onChange={(e) => handleInputChange(e, index)}
                                        className="input input-md w-full p-2 rounded-lg border-2 border-gray-300 focus:ring-indigo-500 focus:outline-none"
                                        placeholder="Bin Name"
                                        required={index === 0} // Only required for SL1Code
                                    />
                                </label>
                                {errors.binConfigs[index]?.binName && (
                                    <p className="text-red-500">{errors.binConfigs[index]?.binName}</p>
                                )}
                            </div>

                            {/* Prefix */}
                            <div className="relative flex-1">
                                <label className="floating-label text-black font-medium">
                                    <span>Prefix</span>
                                    <input
                                        type="text"
                                        id={`prefix-${binConfig.binCode}`}
                                        name="prefix"
                                        value={binConfig.prefix}
                                        onChange={(e) => handleInputChange(e, index)}
                                        className="input input-md w-full p-2 rounded-lg border-2 border-gray-300 focus:ring-indigo-500 focus:outline-none"
                                        placeholder="Prefix"
                                        required={index === 0} // Only required for SL1Code
                                    />
                                </label>
                                {errors.binConfigs[index]?.prefix && (
                                    <p className="text-red-500">{errors.binConfigs[index]?.prefix}</p>
                                )}
                            </div>
                        </div>
                    ))}

                    {/* Is Active Checkbox - Common for all rows */}
                    <div className="flex items-center space-x-3">
                        <input
                            type="checkbox"
                            id="isActive"
                            name="isActive"
                            checked={formData.isActive}
                            onChange={handleIsActiveChange}
                            className="h-4 w-4 rounded border-indigo-300 text-black focus:ring-2 focus:ring-blue-400"
                        />
                        <label htmlFor="isActive" className="text-sm font-medium text-black">
                            Is Active
                        </label>
                    </div>
                </div>

                {/* Submit and Cancel Buttons */}
                <div className="flex justify-end gap-4 mt-6">
                    <button
                        type="submit"
                        className="btn btn-accent text-white"
                    >
                        {formData.binConfigId > 0 ? "Update" : "Save"}
                    </button>
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="btn btn-outline btn-error hover:bg-red-100 hover:text-red-600"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BinConfig;
