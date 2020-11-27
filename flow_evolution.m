clear all; %Clear Variables 
close all; %close open windows

% Configuration for Curve Evolution
M = 2000; %divisor of 2pi to sample discrete points

init = 0; %starting step, number indicates time period elapsed
fin = 4; %ending step (start + 2 intermediate + 1 not shown + final step)

h = (2*pi)/M;
a = 0:h:((2*pi)-h); a = a';

%x1, x2 serve as bounding functions for the initial closed curve, x1_n,
%x2_n are samples from these functions equivalent to the discrete input

% x_1, x_2 for circle of radius 100
x1_0 = 100.*cos(a);
x2_0 = 100.*sin(a);

% x_1, x_2 for ellipse
x1_1 = 5.*cos(a);
x2_1 = 10.*sin(a);

%bicorn curve of height 100
x1_2 = 100.*sin(a);
x2_2 = (100*cos(a).*cos(a))./(2-cos(a));

N = 100;
[x1, x2] = eulerMethod(x1_0, x2_0, N, init, fin);

figure("Name","Circle Initial t = 100");
plot(x1(:,1),x2(:,1)); axis equal; % original shape

figure("Name","Cicle Curve Intermediate 1, t = 100");
plot(x1(:,25),x2(:,25)); axis equal; % t = 1

figure("Name","Circle Curve Intermediate 2, t = 100");
plot(x1(:,50),x2(:,50)); axis equal; % t = 2

figure("Name","Circle Curve Final, t = 100");
plot(x1(:,100),x2(:,100)); axis equal; % final result

[x1, x2] = euler1(x1_1, x2_1, N, init, fin);

figure("Name","Ellipse Initial t = 100");
plot(x1(:,1),x2(:,1)); axis equal; % original shape

figure("Name","Ellipse Curve Intermediate 1, t = 100");
plot(x1(:,25),x2(:,25)); axis equal; % t = 1

figure("Name","Ellipse Curve Intermediate 2, t = 100");
plot(x1(:,50),x2(:,50)); axis equal; % t = 2

figure("Name","Ellipse Curve Final, t = 100");
plot(x1(:,100),x2(:,100)); axis equal; % final result


[x1, x2] = euler1(x1_2, x2_2, N, init, fin);

figure("Name","Bicorn Initial t = 100");
plot(x1(:,1),x2(:,1)); axis equal; % original shape

figure("Name","Bicorn Curve Intermediate 1, t = 100");
plot(x1(:,25),x2(:,25)); axis equal; % t = 1

figure("Name","Bicorn Curve Intermediate 2, t = 100");
plot(x1(:,50),x2(:,50)); axis equal; % t = 2

figure("Name","Bicorn Curve Final, t = 100");
plot(x1(:,100),x2(:,100)); axis equal; % final result

N = 5;
[x1, x2] = euler1(x1_0, x2_0, N, init, fin);

figure("Name","Circle Initial t = 5");
plot(x1(:,1),x2(:,1)); axis equal; % original shape

figure("Name","Cicle Curve Intermediate 1, t = 5");
plot(x1(:,2),x2(:,2)); axis equal; % final result

figure("Name","Circle Curve Intermediate 2, t = 5");
plot(x1(:,3),x2(:,3)); axis equal; % final result

figure("Name","Circle Curve Final, t = 5");
plot(x1(:,5),x2(:,5)); axis equal; % final result

[x1, x2] = euler1(x1_1, x2_1, N, init, fin);

figure("Name","Ellipse Initial t = 5");
plot(x1(:,1),x2(:,1)); axis equal; % original shape

figure("Name","Ellipse Curve Intermediate 1, t = 5");
plot(x1(:,2),x2(:,2)); axis equal; % final result

figure("Name","Ellipse Curve Intermediate 2, t = 5");
plot(x1(:,3),x2(:,3)); axis equal; % final result

figure("Name","Ellipse Curve Final, t = 5");
plot(x1(:,5),x2(:,5)); axis equal; % final result


[x1, x2] = euler1(x1_2, x2_2, N, init, fin);

figure("Name","Bicorn Initial t = 5");
plot(x1(:,1),x2(:,1)); axis equal; % original shape

figure("Name","Bicorn Curve Intermediate 1, t = 5");
plot(x1(:,2),x2(:,2)); axis equal; % final result

figure("Name","Bicorn Curve Intermediate 2, t = 5");
plot(x1(:,3),x2(:,3)); axis equal; % final result

figure("Name","Bicorn Curve Final, t = 5");
plot(x1(:,5),x2(:,5)); axis equal; % final result

N = 25;
[x1, x2] = euler1(x1_0, x2_0, N, init, fin);

figure("Name","Circle Initial t = 25");
plot(x1(:,1),x2(:,1)); axis equal; % original shape

figure("Name","Cicle Curve Intermediate 1, t = 25");
plot(x1(:,10),x2(:,10)); axis equal; % t = 1

figure("Name","Circle Curve Intermediate 2, t = 25");
plot(x1(:,15),x2(:,15)); axis equal; % t = 2

figure("Name","Circle Curve Final, t = 25");
plot(x1(:,25),x2(:,25)); axis equal; % final result

[x1, x2] = euler1(x1_1, x2_1, N, init, fin);

figure("Name","Ellipse Initial t = 25");
plot(x1(:,1),x2(:,1)); axis equal; % original shape

figure("Name","Ellipse Curve Intermediate 1, t = 25");
plot(x1(:,10),x2(:,10)); axis equal; % t = 1

figure("Name","Ellipse Curve Intermediate 2, t = 25");
plot(x1(:,15),x2(:,15)); axis equal; % t = 2

figure("Name","Ellipse Curve Final, t = 25");
plot(x1(:,25),x2(:,25)); axis equal; % t = 1


[x1, x2] = euler1(x1_2, x2_2, N, init, fin);

figure("Name","Bicorn Initial t = 25");
plot(x1(:,1),x2(:,1)); axis equal; % original shape

figure("Name","Bicorn Curve Intermediate 1, t = 25");
plot(x1(:,10),x2(:,10)); axis equal; % t = 1

figure("Name","Bicorn Curve Intermediate 2, t = 25");
plot(x1(:,15),x2(:,15)); axis equal; % t = 2

figure("Name","Bicorn Curve Final, t = 25");
plot(x1(:,25),x2(:,25)); axis equal; % final result





function [x1, x2] = eulerMethod(x1_i, x2_i, N, initialStep, finalStep)


h = (finalStep -ti)/N; % define dt
t=ti:h:finalStep; % time interval - 0:4

x1 = zeros(length(x1_i), length(t)); 
x2 = zeros(length(x2_i), length(t));
x1(:,1) = x1_i;
x2(:,1) = x2_i;

% loop using euler's method
for i = 1:N
    [ x1_dot, x2_dot ] = x_dot(x1(:, i), x2(:, i));
    x1(:, i+1) = x1(:, i) + h*x1_dot;
    x2(:, i+1) = x2(:, i) + h*x2_dot;
end

%x_dot is curvature flow from class notes
%x1_dot = (((x_2a .* x_1aa)-(x_1a .* x_2aa))./(x_a.^3)).* (x_2a./x_a);
%x2_dot = (((x_2a .* x_1aa)-(x_1a .* x_2aa))./(x_a.^3)).* (-x_1a./x_a);

end

function [ x1_dot, x2_dot ] = x_dot(x1, x2)
 
% Compute x_1a, x_1aa, x_2a, x_2aa
 
%x_1 = [x1;x1(1)];
%x_2 = [x2;x2(1)];
 
% compute derivatives
 
% x_1a = dx1/da
x_1a = central_diff(x1);
 
% x_1aa
x_1aa = central_diff(x_1a);
 
% x_2a = dx2/da
x_2a = central_diff(x2);
 
% x_2aa
x_2aa = central_diff(x_2a);
 
%---------------------------------------------------------------
 
% |x_a| = sqrt((x_1a)^2 + (x_2a)^2)
x_a = sqrt((x_1a).^2 + (x_2a).^2);
 
% n
%n = [x_2a./x_a; -x_1a./x_a];
 
%---------------------------------------------------------------
 
% compute equation for curvature flow: x_dot
 
x1_dot = (((x_2a .* x_1aa)-(x_1a .* x_2aa))./(x_a.^3)).* (x_2a./x_a);
x2_dot = (((x_2a .* x_1aa)-(x_1a .* x_2aa))./(x_a.^3)).* (-x_1a./x_a);
 
%---------------------------------------------------------------
end

function [ res ] = central_diff( in )
% Computes the derivatives using central difference approximation

% res = (in(2+in)-f(2-in))./(2*h);
M = size(in,1);
 h = (2*pi)/M;
in = [in(end);in;in(1)];
for i = 1: M
    res(i,1)=(in(i+2)-in(i))/2/h;
end
end
