-- CreateTable
CREATE TABLE `Equipaments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `mark` VARCHAR(191) NOT NULL,
    `SerialNumber` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Equipaments_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
