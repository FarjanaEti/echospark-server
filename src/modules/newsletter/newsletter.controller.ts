import { Request, Response } from "express";
import { newsletterService } from "./newsletter.services";


export const subscribe = async (req: Request, res: Response) => {
                              try {
                                                            const { email } = req.body;
                                                            await newsletterService.subscribe(email);
                                                            res.status(200).json({ success: true, message: "Subscribed successfully" });
                              } catch (err) {
                                                            res.status(500).json({ success: false, message: "Failed to subscribe" });
                              }
};