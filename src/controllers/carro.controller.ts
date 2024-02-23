import { Request, Response } from "express";
import { prisma } from "../prisma";
import { Carro } from "../models/carro.model";

export class CarroController {
    async create(request: Request, response: Response) {
        try {
            const carro = request.body;

            if (!carro.marca || !carro.modelo || !carro.ano || !carro.cor) {
                return response.status(400).send({
                    ok: false,
                    message: "Preecha todos os campos",
                });
            }

            const result = await prisma.carro.create({
                data: {
                    marca: carro.marca,
                    modelo: carro.modelo,
                    ano: carro.ano,
                    cor: carro.cor,
                },
            });

            return response.status(201).send({
                ok: true,
                message: "Carro criado com sucesso",
                data: result,
            });
        } catch (error: any) {
            return response.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }

    async list(request: Request, response: Response) {
        try {
            const result = await prisma.carro.findMany();

            return response.status(200).send({
                ok: true,
                message: "Lista efetuado com sucesso",
                data: result,
            });
        } catch (error: any) {
            return response.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }

    async getByUid(request: Request, response: Response) {
        try {
            const { id } = request.params;

            const carro = await prisma.carro.findUnique({
                where: {
                    id: Number(id),
                },
            });

            if (!carro) {
                return response.status(404).send({
                    ok: false,
                    message: "Este carro não existe",
                });
            }
            return response.status(200).send({
                ok: true,
                message: "Carro listado com sucesso",
                data: carro,
            });
        } catch (error: any) {
            return response.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }

    async remove(request: Request, response: Response) {
        try {
            const { id } = request.params;

            const carro = await prisma.carro.findUnique({
                where: {
                    id: Number(id),
                },
            });

            if (!carro) {
                return response.status(404).send({
                    ok: false,
                    message: "Este carro não existe",
                });
            }

            await prisma.carro.delete({
                where: {
                    id: Number(id),
                },
            });

            return response.status(200).send({
                ok: true,
                message: "Carro excluído com sucesso",
            });
        } catch (error: any) {
            return response.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }

    async update(request: Request, response: Response) {
        try {
            const { id } = request.params;

            const carroData = request.body;

            const carro = await prisma.carro.findUnique({
                where: {
                    id: Number(id),
                },
            });

            if (!carro) {
                return response.status(404).send({
                    ok: false,
                    message: "Este carro não existe",
                });
            }

            const result = await prisma.carro.update({
                where: {
                    id: Number(id),
                },
                data: {
                    modelo: carroData.modelo,
                    ano: carroData.ano,
                },
            });

            return response.status(200).send({
                ok: true,
                message: "Carro atualizado com sucesso",
                data: result,
            });
        } catch (error: any) {
            return response.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }
}
