import React, { useEffect, useState } from "react";
import api from "@/app/services/api";
import { showErrorToast, showSuccessToast } from "@/app/utils/toastConfig";
import { BinCnfg } from "@/app/component/types/BinConfig";
let user = null
if (typeof window !== "undefined") {
    user = localStorage.getItem("userName");
}
interface BinConfigFormProps {
    binConfigData?: BinCnfg | null;
}
const BinConfig: React.FC<BinConfigFormProps> = ({ binConfigData }) => {
    const [wareHouse, setWareHouse] = useState<string[]>([]);
    const [formData, setFormData] = useState({
        binConfigIdId: 0,
        binCode: '',
        binName: '',
        prefix: '',
        whsCode: '',
        startNo: '',
        endNo: '',
        createdBy: user,
        createdOn: '',
        updatedBy: '',
        updatedOn: '',
    });
    const [errors, setErrors] = useState({
        binCode: '',
        binName: '',
        prefix: '',
        whsCode: '',
        startNo: '',
        endNo: '',
    });
    const wareHouseTypes = async () => {
        try {
            const response = await api.get('/WareHouse/WareHouseList');
            debugger
            const datas: string[] = response.data;
            const wareHouseNames = response.data.map((item: { whsCode: string }) => item.whsCode);
            return wareHouseNames;
        } catch (error) {
            console.error("Error fetching vendor types:", error);
            return [];
        }
    };
    useEffect(() => {
        const fetchWareHouse = async () => {
            const fetchWareHouse = await wareHouseTypes();
            setWareHouse(fetchWareHouse);
        };
        fetchWareHouse();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const target = e.target as HTMLInputElement;
            setFormData({ ...formData, [name]: target.checked });
        }
        else {
            setFormData({ ...formData, [name]: value });
        }
    };
    const validateForm = () => {
        debugger
        let isValid = true;
        const newErrors: any = {};

        if (!formData.binCode) {
            newErrors.userName = "BinCode is required";
            isValid = false;
        }

        if (!formData.binName) {
            newErrors.password = "BinName is required";
            isValid = false;
        }


        if (!formData.prefix) {
            newErrors.role = "Prefix is required";
            isValid = false;
        }
        if (!formData.whsCode) {
            newErrors.wareHouse = "WareHouse is required";
            isValid = false;
        }
        if (!formData.startNo) {
            newErrors.startNo = "StartingNo is required";
            isValid = false;
        }
        if (!formData.endNo) {
            newErrors.endNo = "endingNo is required";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        debugger
        if (validateForm()) {
            debugger
            console.log('BinConfigForm Submitted:', formData);
            let BinConfigRequest;
            if (formData.binConfigIdId > 0) {
                BinConfigRequest = {
                    binConfigId: formData.binConfigIdId,
                    binCode: formData.binCode,
                    binName: formData.binName,
                    prefix: formData.prefix,
                    whsCode: formData.whsCode,
                    startNo: formData.startNo,
                    EndNo: formData.endNo,
                    createdBy: '',
                    createdOn: new Date().toISOString(),
                    updatedBy: user,
                    updatedOn: new Date().toISOString(),
                }
            } else {
                debugger;
                BinConfigRequest = {
                    binConfigId: formData.binConfigIdId,
                    binCode: formData.binCode,
                    binName: formData.binName,
                    prefix: formData.prefix,
                    whsCode: formData.whsCode,
                    startNo: formData.startNo,
                    EndNo: formData.endNo,
                    createdBy: user,
                    createdOn: new Date().toISOString(),
                    updatedBy: user,
                    updatedOn: new Date().toISOString(),
                }

            }
            try {

                let response;
                if (formData.binConfigIdId > 0) {
                    const values = {
                        userId: BinConfigRequest.binConfigId,
                    };
                    response = await api.put(`/User/UpdateUser?id=${values.userId}`, BinConfigRequest);
                    console.log(response);
                }
                else {
                    response = await api.post('/User/CreateUser', BinConfigRequest);
                }
                if (response.status === 200 || response.status === 201) {
                    debugger
                    if (response.data !== null) {
                        debugger
                        showSuccessToast(`User ${formData.binConfigIdId > 0 ? 'Updated' : 'Created'} Successfully!`);
                        handleCancel();
                        //router.push('/pages/adduser');
                    } else {
                        showErrorToast(`User ${formData.binConfigIdId > 0 ? 'Updated' : 'Created'} failed.`);
                    }
                } else {
                    showErrorToast(`User ${formData.binConfigIdId > 0 ? 'Updated' : 'Created'} failed.`);
                }
            } catch (error) {
                showErrorToast(`User ${formData.binConfigIdId > 0 ? 'Updated' : 'Created'} failed.`);
                console.error('Error adding/editing user:', error);
            }
        }
    };
    const handleCancel = () => {
        setFormData({
            binConfigIdId: 0,
            binCode: '',
            binName: '',
            prefix: '',
            whsCode: '',
            startNo: '',
            endNo: '',
            createdBy: user,
            createdOn: '',
            updatedBy: '',
            updatedOn: '',
        });
        //router.push('/pages/adduser');
    };
    return (
        <div className="w-full p-10 text-indigo-800 rounded-xl max-h-[700px] overflow-y-auto overflow-x-hidden p-4">
            <h2 className="text-xl font-medium text-center text-black mb-8">
                Add New User
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6">  {/* Updated grid structure */}

                    {/* Username */}
                    <div className="relative">
                        <label className="floating-label text-black font-medium">
                            <span>BinCode</span>
                            <input
                                type="text"
                                id="binCode"
                                name="binCode"
                                value={formData.binCode}
                                onChange={handleInputChange}
                                className="input input-md w-full p-2 rounded-lg border-2 border-black-300 focus:ring-indigo-500 "
                                placeholder="BinCode"
                                required
                            />
                        </label>
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <label className="floating-label text-black font-medium">
                            <span>BinName</span>
                            <input
                                type="text"
                                id="binName"
                                name="binName"
                                value={formData.binName}
                                onChange={handleInputChange}
                                className="input input-md w-full p-2 rounded-lg border-2 border-black-300 focus:ring-indigo-500"
                                placeholder="BinName"
                                required
                            />
                        </label>
                    </div>

                    {/* Confirm Password */}
                    <div className="relative">
                        <label className="floating-label text-black font-medium">
                            <span>Prefix</span>
                            <input
                                type="text"
                                id="prefix"
                                name="prefix"
                                value={formData.prefix}
                                onChange={handleInputChange}
                                className="input input-md w-full p-2 rounded-lg border-2 border-black-300 focus:ring-indigo-500"
                                placeholder="Prefix"
                                required
                            />
                        </label>
                    </div>

                    {/* Warehouse */}
                    <div className="relative">
                        <label className="floating-label text-black font-medium">
                            <span>WareHouseCode</span>
                            <select
                                id="whsCode"
                                name="whsCode"
                                value={formData.whsCode}
                                onChange={handleInputChange}
                                className="input input-md w-full p-2 rounded-lg border-2 border-black-300 focus:ring-indigo-500"
                                required
                            >
                                <option value="" disabled>Select whsCode</option>
                                {wareHouse.map((code, index) => (
                                    <option key={index} value={code}>
                                        {code}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>


                    <div className="relative">
                        <label className="floating-label text-black font-medium">
                            <span>StartingNo</span>
                            <input
                                type="text"
                                id="startNo"
                                name="startNo"
                                value={formData.startNo}
                                onChange={handleInputChange}
                                className="input input-md w-full p-2 rounded-lg border-2 border-black-300 focus:ring-indigo-500"
                                placeholder="StartingNo"
                                required
                            />
                        </label>
                    </div>

                    {/* Device ID */}
                    <div className="relative">
                        <label className="floating-label text-black font-medium">
                            <span>EndingNo</span>
                            <input
                                type="text"
                                id="endNo"
                                name="endNo"
                                value={formData.endNo}
                                onChange={handleInputChange}
                                className="input input-md w-full p-2 rounded-lg border-2 border-black-300 focus:ring-indigo-500"
                                placeholder="EndingNo"
                                required
                            />
                        </label>
                    </div>



                </div>

                {/* Submit and Cancel Buttons */}
                <div className="flex justify-end gap-4 mt-6">
                    <button
                        type="submit"
                        className="btn btn-accent text-white"
                    >
                        {formData.binConfigIdId > 0 ? 'Update' : 'Save'}
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