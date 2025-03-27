"use client"
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/app/services/api";
import { showErrorToast, showSuccessToast } from "@/app/utils/toastConfig";
import { User } from "@/app/component/types/User";
import { ToastContainer } from "react-toastify";
import UserGrid from "../Grid/UserGrid/UserGrid";
import { BinMaster } from "../types/BinMaster";
import { FaBullseye } from "react-icons/fa";
import { Warehouse } from "../types/Warehouse";
//const user = localStorage.getItem("userName");

let user = null
if (typeof window !== "undefined") {
    debugger
    user = localStorage.getItem("userName");
}
interface BinMasterFormProps {
    binMasterData: any | null;
    //onAddUser: (newUser: User) => void;
    onUpdateChanges: (whsCode: string) => void;
}
const BinMasterForm: React.FC<BinMasterFormProps> = ({ binMasterData, onUpdateChanges }) => {

    const [formData, setFormData] = useState({
        binID: 0,
        whsCode: '',
        binLocCode: '',
        sL1Code: '',
        sL2Code: '',
        sL3Code: '',
        sL4Code: '',
        sL5Code: '',
        height: 0,
        width: 0,
        length: 0,
        filter1: '',
        filter2: '',
        filter3: '',
        quantity: 0,
        level: 0,
        active: true,
        userSign: user
    });

    const [errors, setErrors] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        wareHouse: '',
        role: '',
        deviceId: '',
    });
    type UserData = {
        isAdmin: boolean;
    };
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [wareHouse, setWareHouse] = useState<Warehouse[]>([]);
    const router = useRouter();
    const [parsedUserData, setParsedUserData] = useState<UserData | null>(null);
    const searchParams = useSearchParams();

    const role = ['User', 'Admin'];

    useEffect(() => {
        const fetchWareHouse = async () => {
            const fetchWareHouseData = await wareHouseTypes();
            setWareHouse(fetchWareHouseData);
        };
        fetchWareHouse();
        if (typeof window !== "undefined") {
            if (binMasterData) {
                setFormData({
                    ...formData,
                    binID: binMasterData.binID || 0,
                    whsCode: binMasterData.whsCode || "",
                    binLocCode: binMasterData.binLocCode || "",
                    sL1Code: binMasterData.sL1Code || "",
                    sL2Code: binMasterData.sL2Code || "",
                    sL3Code: binMasterData.sL3Code || "",
                    sL4Code: binMasterData.sL4Code || "",
                    sL5Code: binMasterData.sL5Code || "",
                    height: binMasterData.height || 0,
                    width: binMasterData.width || 0,
                    length: binMasterData.length || 0,
                    filter1: binMasterData.filter1 || "",
                    filter2: binMasterData.filter2 || "",
                    filter3: binMasterData.filter3 || "",
                    quantity: binMasterData.quantity || 0,
                    level: binMasterData.level || 0,
                    active: binMasterData.active || "Y", // Assuming "Y" as default active status
                    userSign: binMasterData.userSign || ""
                });
            }
        }
    }, [binMasterData]);

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
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, type, value } = e.target;

        let updatedValue: string | number | boolean = value; // Default for text/select inputs

        if (type === "checkbox") {
            updatedValue = (e.target as HTMLInputElement).checked; // Explicitly cast for checkbox
        }

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: updatedValue, // Update state dynamically
        }));
    };





    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };


    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        debugger
        console.log('UserForm Submitted:', formData);
        let binmasterRequest;
        // if (formData.binID > 0) {
        binmasterRequest = {
            binID: formData.binID,
            whsCode: formData.whsCode,
            binLocCode: formData.binLocCode,
            sl1Code: formData.sL1Code,
            sl2Code: formData.sL2Code,
            sl3Code: formData.sL3Code,
            sl4Code: formData.sL4Code,
            sl5Code: formData.sL5Code,
            height: formData.height,
            width: formData.width,
            length: formData.length,
            filter1: formData.filter1,
            filter2: formData.filter2,
            filter3: formData.filter3,
            quantity: formData.quantity,
            level: formData.level,
            active: formData.active,
            userSign: formData.userSign
        };
        //}


        try {

            let response;
            if (formData.binID > 0) {

                const values = {
                    binID: binmasterRequest?.binID,
                };
                response = await api.put(`/BinMaster/UpdateBinMaster?id=${values.binID}`, binmasterRequest);
                console.log(response);

                // else {
                // response = await api.post('/BinMaster/CreateBinMaster', binmasterRequest);
                //}
                debugger
                if (response.status === 200 || response.status === 201) {

                    if (response.data !== null) {
                        // handleCancel();
                        // console.log(`User ${formData.userId > 0 ? 'Updated' : 'Created'} Successfully!`);
                        // showSuccessToast(`User ${formData.userId > 0 ? 'Updated' : 'Created'} Successfully!`);
                        // onAddUser(response.data);

                        const message = `${formData.binID > 0 ? 'Updated' : 'Created'} Successfully!`;
                        showSuccessToast(message);
                        setTimeout(() => {
                            handleBackClick();
                            console.log(message);
                            onUpdateChanges(binmasterRequest.whsCode);
                        }, 1000);
                    } else {
                        showErrorToast(` ${formData.binID > 0 ? 'Updated' : 'Created'} failed.`);
                    }
                } else {
                    showErrorToast(` ${formData.binID > 0 ? 'Updated' : 'Created'} failed.`);
                }
            }
        } catch (error) {
            showErrorToast(` ${formData.binID > 0 ? 'Updated' : 'Created'} failed.`);
            console.error('Error adding/editing user:', error);
        }
    }

    const handleCancel = () => {
        setFormData({
            binID: 0,
            whsCode: '',
            binLocCode: '',
            sL1Code: '',
            sL2Code: '',
            sL3Code: '',
            sL4Code: '',
            sL5Code: '',
            height: 0,
            width: 0,
            length: 0,
            filter1: '',
            filter2: '',
            filter3: '',
            quantity: 0,
            level: 0,
            active: true,
            userSign: ''
        });
        //router.push('/pages/adduser');
    };

    const handleBackClick = () => {
        setFormData({
            binID: 0,
            whsCode: '',
            binLocCode: '',
            sL1Code: '',
            sL2Code: '',
            sL3Code: '',
            sL4Code: '',
            sL5Code: '',
            height: 0,
            width: 0,
            length: 0,
            filter1: '',
            filter2: '',
            filter3: '',
            quantity: 0,
            level: 0,
            active: true,
            userSign: ''
        });
        // Retrieve the checkbox element by its ID
        const drawerCheckbox = document.getElementById('my-drawer-4') as HTMLInputElement | null;

        // Check if the element exists
        if (drawerCheckbox) {
            // Set the checked property to false to close the drawer
            drawerCheckbox.checked = false;
        }
    };

    return (
        <div className="relative w-full p-10 text-indigo-800 rounded-xl max-h-[700px] overflow-y-auto overflow-x-hidden">

            <form onSubmit={handleSubmit} className="space-y-6">
                <button
                    className="text-red-500 text-3xl absolute top-4 right-4 rounded-full hover:scale-125 transition-transform duration-200 ease-in-out focus:outline-none"
                    onClick={handleBackClick}
                    aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h2 className="text-xl font-medium text-center text-black mb-8">
                    Update Bin
                </h2>
                <div className="grid grid-cols-1 gap-6">

                    {/* Warehouse Code */}
                    {/* <div className="relative flex items-center justify-left">
                        <label className="floating-label text-black font-medium">
                            <span>Warehouse Code</span>
                            <select
                                id="whsCode"
                                name="whsCode"
                                value={formData.whsCode} // Bind selected value here
                                onChange={handleInputChange} // Handle input change
                                className="input input-md w-full p-2 rounded-lg border-2 border-gray-300 focus:ring-indigo-500 focus:outline-none font-medium text-center"
                                required
                                style={{ fontSize: '10px' }} // Font size for selected value
                            >
                                <option value="" disabled>
                                    Select Warehouse Code
                                </option>
                                {wareHouse.map((item, index) => (
                                    <option key={index} value={item.whsCode}>
                                        {item.whsName}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div> */}


                    {/* Bin Location Code */}
                    <div className="relative">
                        <label className="floating-label text-black font-medium">
                            <span>Bin Location Code</span>
                            <input
                                type="text"
                                id="binLocCode"
                                name="binLocCode"
                                value={formData.binLocCode}
                                onChange={handleInputChange}
                                className="input input-md w-full p-2 rounded-lg border-2 border-gray-300 focus:border-black focus:outline-none"
                                placeholder="Bin Location Code"

                            />
                        </label>
                    </div>

                    {/* SL1 Code */}
                    <div className="relative">
                        <label className="floating-label text-black font-medium">
                            <span>SL1 Code</span>
                            <input
                                type="text"
                                id="sL1Code"
                                name="sL1Code"  // ✅ Fixed name to match state
                                value={formData.sL1Code}
                                onChange={handleInputChange}
                                className="input input-md w-full p-2 rounded-lg border-2 border-gray-300 focus:border-black focus:outline-none"
                                placeholder="SL1 Code"
                            />
                        </label>
                    </div>
                    {/*SL2 Code */}
                    <div className="relative">
                        <label className="floating-label text-black font-medium">
                            <span>SL2 Code</span>
                            <input
                                type="text"
                                id="sL2Code"
                                name="sL2Code"
                                value={formData.sL2Code}
                                onChange={handleInputChange}
                                className="input input-md w-full p-2 rounded-lg border-2 border-gray-300 focus:border-black focus:outline-none"
                                placeholder="SL2 Code"

                            />
                        </label>
                    </div>

                    {/* SL3 Code */}
                    <div className="relative">
                        <label className="floating-label text-black font-medium">
                            <span>SL3 Code</span>
                            <input
                                type="text"
                                id="sL3Code"
                                name="sL3Code"
                                value={formData.sL3Code}
                                onChange={handleInputChange}
                                className="input input-md w-full p-2 rounded-lg border-2 border-gray-300 focus:border-black focus:outline-none"
                                placeholder="SL3 Code"

                            />
                        </label>
                    </div>

                    {/* SL4 Code */}
                    <div className="relative">
                        <label className="floating-label text-black font-medium">
                            <span>SL4 Code</span>
                            <input
                                type="text"
                                id="sL4Code"
                                name="sL4Code"
                                value={formData.sL4Code}
                                onChange={handleInputChange}
                                className="input input-md w-full p-2 rounded-lg border-2 border-gray-300 focus:border-black focus:outline-none"
                                placeholder="SL4 Code"

                            />
                        </label>
                    </div>

                    {/* SL5 Code */}
                    <div className="relative">
                        <label className="floating-label text-black font-medium">
                            <span>SL5 Code</span>
                            <input
                                type="text"
                                id="sL5Code"
                                name="sL5Code"
                                value={formData.sL5Code}
                                onChange={handleInputChange}
                                className="input input-md w-full p-2 rounded-lg border-2 border-gray-300 focus:border-black focus:outline-none"
                                placeholder="SL5 Code"

                            />
                        </label>
                    </div>


                    {/* Height */}
                    <div className="relative">
                        <label className="floating-label text-black font-medium">
                            <span>Height</span>
                            <input
                                type="number"
                                id="height"
                                name="height"
                                value={formData.height}
                                onChange={handleInputChange}
                                className="input input-md w-full p-2 rounded-lg border-2 border-gray-300 focus:border-black focus:outline-none"
                                placeholder="Height"

                            />
                        </label>
                    </div>

                    {/* Width */}
                    <div className="relative">
                        <label className="floating-label text-black font-medium">
                            <span>Width</span>
                            <input
                                type="number"
                                id="width"
                                name="width"
                                value={formData.width}
                                onChange={handleInputChange}
                                className="input input-md w-full p-2 rounded-lg border-2 border-gray-300 focus:border-black focus:outline-none"
                                placeholder="Width"

                            />
                        </label>
                    </div>

                    {/* Length */}
                    <div className="relative">
                        <label className="floating-label text-black font-medium">
                            <span>Length</span>
                            <input
                                type="number"
                                id="length"
                                name="length"
                                value={formData.length}
                                onChange={handleInputChange}
                                className="input input-md w-full p-2 rounded-lg border-2 border-gray-300 focus:border-black focus:outline-none"
                                placeholder="Length"

                            />
                        </label>
                    </div>

                    {/* Filter 1 */}
                    <div className="relative">
                        <label className="floating-label text-black font-medium">
                            <span>Filter 1</span>
                            <input
                                type="text"
                                id="filter1"
                                name="filter1"
                                value={formData.filter1}
                                onChange={handleInputChange}
                                className="input input-md w-full p-2 rounded-lg border-2 border-gray-300 focus:border-black focus:outline-none"
                                placeholder="Filter 1"

                            />
                        </label>
                    </div>

                    {/* Filter 2 */}
                    <div className="relative">
                        <label className="floating-label text-black font-medium">
                            <span>Filter 2</span>
                            <input
                                type="text"
                                id="filter2"
                                name="filter2"
                                value={formData.filter2}
                                onChange={handleInputChange}
                                className="input input-md w-full p-2 rounded-lg border-2 border-gray-300 focus:border-black focus:outline-none"
                                placeholder="Filter 2"

                            />
                        </label>
                    </div>

                    {/* Filter 3 */}
                    <div className="relative">
                        <label className="floating-label text-black font-medium">
                            <span>Filter 3</span>
                            <input
                                type="text"
                                id="filter3"
                                name="filter3"
                                value={formData.filter3}
                                onChange={handleInputChange}
                                className="input input-md w-full p-2 rounded-lg border-2 border-gray-300 focus:border-black focus:outline-none"
                                placeholder="Filter 3"

                            />
                        </label>
                    </div>

                    {/* Quantity */}
                    <div className="relative">
                        <label className="floating-label text-black font-medium">
                            <span>Quantity</span>
                            <input
                                type="number"
                                id="quantity"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleInputChange}
                                className="input input-md w-full p-2 rounded-lg border-2 border-gray-300 focus:border-black focus:outline-none"
                                placeholder="Quantity"

                            />
                        </label>
                    </div>

                    {/* Level */}
                    <div className="relative">
                        <label className="floating-label text-black font-medium">
                            <span>Level</span>
                            <input
                                type="number"
                                id="level"
                                name="level"
                                value={formData.level}
                                onChange={handleInputChange}
                                className="input input-md w-full p-2 rounded-lg border-2 border-gray-300 focus:border-black focus:outline-none"
                                placeholder="Level"

                            />
                        </label>
                    </div>

                    {/* Active Status */}
                    <div className="flex items-center space-x-3">
                        <input
                            type="checkbox"
                            id="isActive"
                            name="active" // Ensure this matches the state key "active"
                            checked={formData.active}
                            onChange={handleInputChange} // Ensure this function correctly updates state
                            className="h-4 w-4 rounded border-indigo-300 text-black focus:ring-2 focus:ring-blue-400"
                        />
                        <label htmlFor="isActive" className="text-sm font-medium text-black">
                            Is Active
                        </label>
                    </div>

                </div>

                {/* Submit and Cancel Buttons */}
                <div className="flex justify-end gap-4 mt-6">
                    <button type="submit" className="btn btn-soft bg-[#b08aff] text-white flex items-center gap-2 hover:bg-[#8c57ff]">
                        Update
                    </button>
                    <button type="button" onClick={handleCancel} className="btn btn-outline btn-error hover:text-white"
                    >
                        Clear
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );


};
export default BinMasterForm;