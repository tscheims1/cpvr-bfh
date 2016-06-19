%##########################################################################
% File:       HoughCircle.m
% Purpose:    Demo for local operators and image convolution
% Author:     Marcus Hudritsch
% Date:       15-FEB-09
% Copyright:  Marcus Hudritsch, Kirchrain 18, 2572 Sutz
%             THIS SOFTWARE IS PROVIDED FOR EDUCATIONAL PURPOSE ONLY AND
%             WITHOUT ANY WARRANTIES WHETHER EXPRESSED OR IMPLIED.
%##########################################################################
clear all; close all; clc; %clear matrices, close figures & clear cmd wnd.

X = imread('/home/tscheims/Documents/Images/euros.png'); %Load image into matrix X
I = im2double(X);                  %Convert to doubles [0-1]
imshow(I); title('Original');


I = im2double(im2bw(I, 0.9));
I = ~I;
figure; imshow(I); title('After im2bw');

[centers, radii, metric] = imfindcircles(I,[40,50]);
centersStrong3 = centers(1:1,:);
radiiStrong3 = radii(1:1);
metricStrong3 = metric(1:1);
figure;
imshow(im2double(X));
viscircles(centersStrong3, radiiStrong3,'EdgeColor','b');