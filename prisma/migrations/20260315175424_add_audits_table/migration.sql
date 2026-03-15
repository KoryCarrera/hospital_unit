-- CreateTable
CREATE TABLE "auditorias" (
    "id_aud" SERIAL NOT NULL,
    "tabla_afectada" VARCHAR(20) NOT NULL,
    "tipo_accion" VARCHAR(20) NOT NULL,
    "id_user" INTEGER NOT NULL,
    "valor_anterior" JSONB,
    "valor_actual" JSONB,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "motivo" TEXT NOT NULL,

    CONSTRAINT "auditorias_pkey" PRIMARY KEY ("id_aud")
);

-- AddForeignKey
ALTER TABLE "auditorias" ADD CONSTRAINT "auditorias_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "usuarios"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;
