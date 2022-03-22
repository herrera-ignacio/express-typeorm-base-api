import { IController } from "../types/IController";
import PhotoService from "../services/PhotoService";
import { IRequestHandler } from "../types/IRequestHandler";

class PhotoController implements IController {
  private photoService = new PhotoService();

  public getById: IRequestHandler = async (req, res) => {
    const photoId = Number(req.params.id);
    const photo = await this.photoService.getById(photoId);
    res.status(200).json({ data: photo });
  };

  public create: IRequestHandler = async (req, res) => {
    const photoPayload = req.body;
    const photo = await this.photoService.create(photoPayload);
    res.status(201).json({ data: photo });
  };

  public update: IRequestHandler = async (req, res) => {
    const photoId = Number(req.params.id);
    const photoPayload = req.body;
    try {
      const photoUpdated = await this.photoService.update(photoId, photoPayload);
      res.status(200).json({
        data:photoUpdated,
      });
    } catch (error) {
      console.error(error);
    }
    
  };
}

export default PhotoController;
