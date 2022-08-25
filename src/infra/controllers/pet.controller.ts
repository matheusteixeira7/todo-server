
import { CreatePet, DeletePet, GetPet, GetPetOwner, ListPets, UpdatePet } from '@application/usecases/pets'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class PetsController {
  async list (req: Request, res: Response): Promise<Response> {
    const listPets = container.resolve(ListPets)
    const pets = await listPets.execute()
    return res.json(pets)
  }

  async create (req: Request, res: Response): Promise<Response> {
    const createPet = container.resolve(CreatePet)
    const pet = await createPet.execute({ ...req.body })
    return res.json(pet)
  }

  async get (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const getPet = container.resolve(GetPet)
    const pet = await getPet.execute({ id })
    return res.json(pet)
  }

  async getOwner (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const getPetOwner = container.resolve(GetPetOwner)
    const petOwner = await getPetOwner.execute(id)
    return res.json(petOwner)
  }

  async delete (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const deletePet = container.resolve(DeletePet)
    await deletePet.execute({ id })
    return res.status(204).json()
  }

  async update (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const updatePet = container.resolve(UpdatePet)
    const pet = await updatePet.execute({ id, ...req.body })
    return res.json(pet)
  }
}
