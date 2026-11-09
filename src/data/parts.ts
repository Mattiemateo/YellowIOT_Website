import type { ImageMetadata } from 'astro';

import shooterDuo from '../assets/robot/shooter-duo.webp';
import shooterSchem from '../assets/robot/shooter-schem.webp';
import shooterColor from '../assets/robot/shooter-color.webp';
import limelightDuo from '../assets/robot/limelight-duo.webp';
import limelightSchem from '../assets/robot/limelight-schem.webp';
import limelightColor from '../assets/robot/limelight-color.webp';
import intakeDuo from '../assets/robot/intake-duo.webp';
import intakeSchem from '../assets/robot/intake-schem.webp';
import intakeDetailDuo from '../assets/robot/intake-detail-duo.webp';
import drivetrainDuo from '../assets/robot/drivetrain-duo.webp';
import drivetrainSchem from '../assets/robot/drivetrain-schem.webp';
import drivetrainColor from '../assets/robot/drivetrain-color.webp';
import odometryDuo from '../assets/robot/odometry-duo.webp';
import odometrySchem from '../assets/robot/odometry-schem.webp';
import odometryColor from '../assets/robot/odometry-color.webp';

export interface Figure {
  src: ImageMetadata;
  alt: string;
  caption: string;
}

export interface Part {
  slug: string;
  n: number;
  name: string;
  /** Positie van de hotspot op de robottekening, in procenten. */
  x: number;
  y: number;
  kicker: string;
  /** Korte uitleg voor de kaart op de homepage. */
  teaser: string;
  thumb: ImageMetadata;
  figures: Figure[];
}

// De onderdeelpagina's zijn voorlopig placeholders: de echte uitleg volgt later.
export const parts: Part[] = [
  {
    slug: 'shooter',
    n: 1,
    name: 'Shooter & transfer',
    x: 51.4,
    y: 24.5,
    kicker: 'Onderdeel 01',
    teaser: 'Het vliegwiel dat de ballen het veld in schiet.',
    thumb: shooterDuo,
    figures: [
      { src: shooterDuo, alt: 'Shooter en transfer van Porcupine', caption: 'shooter en transfer' },
      { src: shooterSchem, alt: 'Blauwdruk-tekening van de shooter', caption: 'blueprint' },
      { src: shooterColor, alt: 'Foto van de shooter in kleur', caption: 'in kleur' },
    ],
  },
  {
    slug: 'limelight',
    n: 2,
    name: 'Limelight auto-aim',
    x: 37.9,
    y: 39.5,
    kicker: 'Onderdeel 02',
    teaser: 'De camera die het doel vindt en de shooter laat richten.',
    thumb: limelightDuo,
    figures: [
      { src: limelightDuo, alt: 'Limelight-camera op Porcupine', caption: 'Limelight-camera' },
      { src: limelightSchem, alt: 'Blauwdruk-tekening van de Limelight-camera', caption: 'blueprint' },
      { src: limelightColor, alt: 'Foto van de Limelight-camera in kleur', caption: 'in kleur' },
    ],
  },
  {
    slug: 'intake',
    n: 3,
    name: 'Intake',
    x: 33.4,
    y: 82.2,
    kicker: 'Onderdeel 03',
    teaser: 'Rollers die ballen van de vloer oppakken.',
    thumb: intakeDuo,
    figures: [
      { src: intakeDuo, alt: 'Intake van Porcupine: rollers aan de voorkant', caption: 'intake van voren' },
      { src: intakeSchem, alt: 'Blauwdruk-tekening van de intake', caption: 'blueprint' },
      { src: intakeDetailDuo, alt: 'Close-up van de intake met een bal tussen de rollers', caption: 'bal in de intake' },
    ],
  },
  {
    slug: 'drivetrain',
    n: 4,
    name: 'Drivetrain',
    x: 13.2,
    y: 68,
    kicker: 'Onderdeel 04',
    teaser: 'Mecanum-wielen: alle kanten op rijden.',
    thumb: drivetrainDuo,
    figures: [
      { src: drivetrainDuo, alt: 'Onderkant van Porcupine met de drivetrain', caption: 'drivetrain' },
      { src: drivetrainSchem, alt: 'Blauwdruk-tekening van de drivetrain', caption: 'blueprint' },
      { src: drivetrainColor, alt: 'Foto van de drivetrain in kleur', caption: 'in kleur' },
    ],
  },
  {
    slug: 'odometry',
    n: 5,
    name: 'Odometry pods',
    x: 78,
    y: 88,
    kicker: 'Onderdeel 05 · onderkant',
    teaser: 'Meetwieltjes onder de robot: weten waar we zijn.',
    thumb: odometryDuo,
    figures: [
      { src: odometryDuo, alt: 'Odometry pods onder Porcupine', caption: 'odometry pods' },
      { src: odometrySchem, alt: 'Blauwdruk-tekening van de odometry pods', caption: 'blueprint' },
      { src: odometryColor, alt: 'Foto van de odometry pods in kleur', caption: 'in kleur' },
    ],
  },
];
