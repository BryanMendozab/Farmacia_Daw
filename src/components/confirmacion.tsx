interface Props {
    mensaje: string;
    onConfirmar: () => void;
    onCancelar: () => void;
}

function Confirmacion({ mensaje, onConfirmar, onCancelar }: Props) {
    return (
        <>
            <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
                <div className='bg-white rounded-xl shadow-xl p-6 max-w-sm w-full mx-4'>
                    <div className='flex items-center gap-3 mb-4'>
                        <div className='bg-red-100 p-2 rounded-full'>
                            <svg className='w-6 h-6 text-red-600' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                                <path strokeLinecap='round' strokeLinejoin='round' d='M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z' />
                            </svg>
                        </div>
                        <h3 className='text-lg font-semibold text-gray-800'>Confirmar eliminación</h3>
                    </div>

                    <p className='text-gray-600 mb-6'>{mensaje}</p>

                    <div className='flex gap-3 justify-end'>
                        <button onClick={onCancelar} className='px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition-colors font-medium'>
                            Cancelar
                        </button>
                        <button
                            onClick={onConfirmar}
                            className='px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors font-medium'>
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Confirmacion
