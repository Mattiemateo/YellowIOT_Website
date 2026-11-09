import Foundation
import Vision
import CoreImage
import ImageIO
import UniformTypeIdentifiers

// usage: cutout <in> <out.png>  — writes the input with background made transparent
let args = CommandLine.arguments
guard args.count == 3 else { print("usage: cutout in out.png"); exit(1) }
let inURL = URL(fileURLWithPath: args[1])
let outURL = URL(fileURLWithPath: args[2])

guard let ci = CIImage(contentsOf: inURL, options: [.applyOrientationProperty: true]) else { print("cannot read"); exit(1) }
let handler = VNImageRequestHandler(ciImage: ci)
let req = VNGenerateForegroundInstanceMaskRequest()
do { try handler.perform([req]) } catch { print("vision error \(error)"); exit(1) }
guard let obs = req.results?.first else { print("no subject"); exit(2) }
let buf = try obs.generateMaskedImage(ofInstances: obs.allInstances, from: handler, croppedToInstancesExtent: false)
let out = CIImage(cvPixelBuffer: buf)
let ctx = CIContext()
guard let cg = ctx.createCGImage(out, from: out.extent),
      let dest = CGImageDestinationCreateWithURL(outURL as CFURL, UTType.png.identifier as CFString, 1, nil) else { exit(1) }
CGImageDestinationAddImage(dest, cg, nil)
CGImageDestinationFinalize(dest)
print("ok \(cg.width)x\(cg.height) instances=\(obs.allInstances.count)")
