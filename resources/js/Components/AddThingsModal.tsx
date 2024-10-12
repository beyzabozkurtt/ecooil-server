import React from 'react';

interface AddThingsModalProps {
    name: string;
    inputCount: number;
    labels: string[];
    closeModal: () => void;
    onSubmit: (formData: Record<string, string>) => void;
}

const AddThingsModal: React.FC<AddThingsModalProps> = ({ name, inputCount, labels, closeModal, onSubmit }) => {
    const [formData, setFormData] = React.useState<Record<string, string>>({});

    const handleChange = (index: number, value: string) => {
        setFormData({ ...formData, [labels[index]]: value });
    };

    const handleSubmit = () => {
        onSubmit(formData);
        closeModal();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-gray-200 py-8 w-72 px-6 shadow-2xl rounded-lg relative">
                <button onClick={closeModal} className="absolute top-2 right-2 text-gray-700">
                    &#x2715;
                </button>
                <div className="text-xl font-bold mb-4">
                    {name}
                </div>
                {Array.from({ length: inputCount }).map((_, index) => (
                    <div key={index} className="mb-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            {labels[index]}
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            onChange={(e) => handleChange(index, e.target.value)}
                        />
                    </div>
                ))}
                <div className="w-full flex items-center justify-end">
                    <div
                        className="py-2 flex items-center justify-center w-full bg-green-500 rounded text-xl cursor-pointer"
                        onClick={handleSubmit}
                    >
                        Devam
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddThingsModal;
