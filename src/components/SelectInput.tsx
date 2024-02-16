export const SelectInput = ({ name, label, options, value, onChange }: { name: string, label: string, options: string[], value: string, onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void }) => {
    
    return (
        <div>
            <label htmlFor={name} className="mr-2">{label}:</label>
            <select id={name} value={value} onChange={onChange}>
                {
                    options.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                    ))
                }
            </select>
        </div>
    )
}