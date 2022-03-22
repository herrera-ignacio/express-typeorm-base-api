/* eslint-disable class-methods-use-this */
import { IService } from "../types/IService";
import PhotoRepository from "../repositories/PhotoRepository";
import Photo from "../entities/Photo";
import PhotoCreateValidator from "../validators/Photo/PhotoCreateValidator";
// import PhotoValidator from "../validators/Photo/PhotoValidator";



export default class PhotoService implements IService<Photo>{
  private static getRepository(): ReturnType<typeof PhotoRepository> {
    return PhotoRepository();
  }

  public async getById(id: number): Promise<Photo> {
    console.log(id);
    return PhotoService.getRepository().findById(id);
  }

  public async create(payload: PhotoCreateValidator): Promise<Photo> {
    console.log(payload);
    return PhotoService.getRepository().save({ ...payload });
  }

  public async update(id:number, payload:PhotoCreateValidator): Promise<Photo>{
    const photoToUpdate = await this.getById(id);
    const getRepositoryService = PhotoService.getRepository();
    getRepositoryService.merge(photoToUpdate, payload);
    return getRepositoryService.save(photoToUpdate);
  }
}
