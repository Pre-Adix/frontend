// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Select } from '@/components/ui/select';
// import { useMutation, useQuery } from '@tanstack/react-query';
// import axios from 'axios';

// const enrollmentSchema = z.object({
//   studentId: z.string().uuid(),
//   cycleId: z.string().uuid(),
//   careerId: z.string().uuid(),
//   startDate: z.string(),
//   endDate: z.string(),
//   modality: z.enum(['PRESENCIAL', 'VIRTUAL']),
//   shift: z.enum(['MANANA', 'TARDE', 'NOCHE']),
//   credit: z.boolean(),
//   paymentCarnet: z.boolean(),
//   carnetCost: z.number().min(0),
//   totalCost: z.number().min(0),
//   initialPayment: z.number().optional(),
//   discounts: z.number().optional(),
// });

// export default function EnrollmentForm() {
//   const { register, handleSubmit, formState: { errors } } = useForm({
//     resolver: zodResolver(enrollmentSchema),
//   });

//   const mutation = useMutation({
//     mutationFn: async (data) => {
//       return axios.post('/api/enrollments', data);
//     },
//     onSuccess: () => {
//       alert('Matrícula creada con éxito');
//     },
//     onError: () => {
//       alert('Error al crear matrícula');
//     },
//   });

//   const onSubmit = (data) => {
//     mutation.mutate(data);
//   };

//   return (
//     <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow">
//       <h2 className="text-2xl font-semibold mb-4">Registrar Matrícula</h2>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <Input label="ID Estudiante" {...register('studentId')} error={errors.studentId?.message} />
//         <Input label="ID Ciclo" {...register('cycleId')} error={errors.cycleId?.message} />
//         <Input label="ID Carrera" {...register('careerId')} error={errors.careerId?.message} />
//         <Input label="Fecha Inicio" type="date" {...register('startDate')} error={errors.startDate?.message} />
//         <Input label="Fecha Fin" type="date" {...register('endDate')} error={errors.endDate?.message} />
//         <Select label="Modalidad" {...register('modality')} options={['PRESENCIAL', 'VIRTUAL']} />
//         <Select label="Turno" {...register('shift')} options={['MANANA', 'TARDE', 'NOCHE']} />
//         <Input label="Costo Carnet" type="number" {...register('carnetCost')} error={errors.carnetCost?.message} />
//         <Input label="Costo Total" type="number" {...register('totalCost')} error={errors.totalCost?.message} />
//         <Button type="submit" className="mt-4">Registrar</Button>
//       </form>
//     </div>
//   );
// }
